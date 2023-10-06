import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { quoteLinesFn } from './linesHandlers'
import { quoteAdditionalLinesFn } from './addonsHandlers'
import { ratesFn } from './ratesHandlers'
import { zonesFn } from './zonesHandlers'
import { useUpdateQuote } from './updateQuote'
import {
	IQuoteForm,
	IquoteAdditionalLinesHandlers,
	IquoteLinesHandlers,
	IRatesHandlers,
	IZonesHandlers,
	QuoteData,
	IQuoteLine,
	IQuoteAdditionalLines,
	IQuoteZones,
	IRates,
	QuoteDataToUpdate,
	IColumnsQuoteLines,
	estimatedWay,
	columnsHours,
	columnsSQM,
} from 'models/quotes.model'
import { useServiceRates } from './useServiceRates'
import { totalsFn } from './totalHandlers'
import { useCreateQuote } from './createQuote'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'config'
import { assignDataToEdit } from './assignDataToEdit'
import { useSelector } from 'react-redux'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

interface IUseFormHandler {
	quote_id?: number
	quote_data?: QuoteData
	quote_lines?: IQuoteLine[]
	quote_addons?: IQuoteAdditionalLines[]
	quote_rates?: IRates[]
	quote_zones?: IQuoteZones[]
}

const itemsTabsAdmin = [
	{ label: 'Zones', id: 0 },
	{ label: 'Rates', id: 1 },
	{ label: 'Admin Rates', id: 2 },
]

const itemsTabsStandard = [
	{ label: 'Zones', id: 0 },
	{ label: 'Rates', id: 1 },
]

export const useFormHandler = ({
	quote_id,
	quote_data,
	quote_lines,
	quote_addons,
	quote_rates,
	quote_zones,
}: IUseFormHandler) => {
	const logedUserData = useSelector((store: AppStore) => store.user)

	const itemsTabs =
		logedUserData?.userType === Roles.admin ? itemsTabsAdmin : itemsTabsStandard

	const navigate = useNavigate()
	const { createQuote } = useCreateQuote()
	const {
		updateQuote,
		updateQuoteAddOns,
		updateQuoteLines,
		updateQuoteRates,
		updateQuoteZones,
	} = useUpdateQuote()

	const [editInfoLoaded, setEditInfoLoaded] = useState(false)
	const [backToMainTable, setBackToMainTable] = useState(false)

	const ratesInfo = useServiceRates()

	const validationSchema = Yup.object().shape({
		job_type: Yup.string().required('Job Type Is Required'),
		estimatedWay: Yup.string().required('Required'),
		estimator: Yup.string().required('Estimator is Required'),
		client: Yup.string().required('Client is Required'),
		client_contact: Yup.string().required('Contact is Required'),
		variation_job_id: Yup.string().when('quote_type', (quote_type) => {
			if (quote_type[0] === 'Variation') {
				return Yup.string().required('Variation Job ID is required')
			}
			return Yup.string().nullable()
		}),
		zones: Yup.array().of(
			Yup.object().shape({
				zone_label: Yup.string().required('Zone is required'),
			})
		),
	})

	const initialValues: IQuoteForm = {
		quote_type: 'New',
		job_type: '',
		variation_job_id: '',
		PO_Number: '',
		max_zones: 0,
		client: null,
		client_contact: null,
		quote_num: '',
		scope_of_work: '',
		estimator: null,

		fullAddress: '',
		street: '',
		street2: '',
		city: '',
		postal: '',

		estimatedWay: null,

		quote_lines: [],

		quote_additional_lines: [],

		terms: '',

		erectDismantleTotal: 0,
		additionalTotal: 0,
		weekTotal: 0,
		total: 0,

		rates: ratesInfo.data,
		zones: [],
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			try {
				if (!editInfoLoaded) {
					// when the quote is new execute create a quote
					const resultQuote = await createQuote(values)
					if (resultQuote?.quote_id) {
						navigate(
							AppRoutes.privateRoutes.QuotesPDF.replace(
								':id',
								resultQuote.quote_id
							)
						)
					}
				} else {
					// when the quote is edited execute update a quote
					const quoteData: QuoteDataToUpdate = {
						job_type: values.job_type,
						quote_type: values.quote_type,
						max_zones: values.max_zones,
						client: Number(values.client),
						client_contact: values.client_contact,
						scope_of_work: values.scope_of_work,
						estimator: Number(values.estimator),

						fullAddress: values.fullAddress,
						street: values.street,
						street2: values.street2,
						city: values.city,
						postal: values.postal,

						estimatedWay: values.estimatedWay as string,

						terms: values.terms,

						erectDismantleTotal: Number(values.erectDismantleTotal),
						additionalTotal: Number(values.additionalTotal),
						weekTotal: Number(values.weekTotal),
						total: Number(values.total),
						variation_job_id: null,
						PO_Number: null,
					}
					updateQuote(quoteData, quote_id as number)
					updateQuoteAddOns(values.quote_additional_lines, quote_id as number)
					updateQuoteLines(values.quote_lines, quote_id as number)
					updateQuoteRates(values.rates, quote_id as number)
					updateQuoteZones(values.zones, quote_id as number)

					if (backToMainTable) navigate(AppRoutes.privateRoutes.Quotes)
					else
						navigate(
							AppRoutes.privateRoutes.QuotesDetail.replace(
								':id',
								String(quote_id)
							)
						)
				}
			} catch (error) {
				console.log(error)
			}
		},
	})

	const quoteLinesHandlers: IquoteLinesHandlers = {
		addNewQuoteLine: () => {
			const lines = quoteLinesFn.addNewQuoteLine(formik.values.quote_lines)
			formik.setFieldValue('quote_lines', lines)
		},
		removeQuoteLine: (index: number) => {
			const lines = quoteLinesFn.removeQuoteLine(
				index,
				formik.values.quote_lines
			)
			formik.setFieldValue('quote_lines', lines)
		},
		updateQuoteLine: async (
			index: number,
			field: string,
			value: string | number
		) => {
			let newQuoteLines = await quoteLinesFn.updateQuoteLine(
				index,
				formik.values.quote_lines,
				field,
				value
			)
			newQuoteLines = await quoteLinesFn.checkZones(
				formik.values.zones,
				newQuoteLines
			)
			newQuoteLines = await quoteLinesFn.calculateQuoteLines(
				formik.values.rates,
				formik.values.estimatedWay,
				newQuoteLines
			)
			formik.setFieldValue('quote_lines', newQuoteLines)
		},
		validateQuoteLinesColumns: (
			columnsQuoteLines: IColumnsQuoteLines[],
			estimatedWayOption: estimatedWay
		) => {
			const filteredColumnsQuoteLines =
				estimatedWayOption === estimatedWay.SQM
					? columnsQuoteLines.filter(
							(column) => !columnsHours.includes(column.key)
					  )
					: columnsQuoteLines.filter(
							(column) => !columnsSQM.includes(column.key)
					  )
			return filteredColumnsQuoteLines
		},
	}

	const quoteAdditionalLinesHandlers: IquoteAdditionalLinesHandlers = {
		addNewQuoteAdditionalLine: () => {
			const newline = quoteAdditionalLinesFn.addNewQuoteLine(
				formik.values.quote_additional_lines
			)
			formik.setFieldValue('quote_additional_lines', newline)
		},
		removeQuoteAdditionalLine: (index: number) => {
			const lines = quoteAdditionalLinesFn.removeQuoteLine(
				index,
				formik.values.quote_additional_lines
			)
			formik.setFieldValue('quote_additional_lines', lines)
		},
		updateQuoteAdditionalLine: (
			index: number,
			field: string,
			value: string | number
		) => {
			let lines = quoteAdditionalLinesFn.updateQuoteLine(
				index,
				formik.values.quote_additional_lines,
				field,
				value
			)
			lines = quoteAdditionalLinesFn.calculateLines(lines, formik.values.rates)

			formik.setFieldValue('quote_additional_lines', lines)
		},
	}

	const ratesHandlers: IRatesHandlers = {
		addNewRate: () =>
			ratesFn.addNewRate(formik.values.rates, formik.setFieldValue),
		removeRate: (index: number) =>
			ratesFn.removeRate(index, formik.values.rates, formik.setFieldValue),
		updateRate: (index: number, field: string, value: string | number) =>
			ratesFn.updateRate(
				index,
				formik.values.rates,
				formik.setFieldValue,
				field,
				value
			),
	}

	const zonesHandlers: IZonesHandlers = {
		addNewZone: (zone_id: number) =>
			zonesFn.addNewZone(zone_id, formik.values.zones, formik.setFieldValue),
		removeZone: (index: number) =>
			zonesFn.removezone(index, formik.values.zones, formik.setFieldValue),
		updateZone: (index: number, field: string, value: string | number) =>
			zonesFn.updateZone(
				index,
				formik.values.zones,
				formik.setFieldValue,
				field,
				value
			),
	}

	useEffect(() => {
		if (
			quote_data &&
			quote_lines &&
			quote_addons &&
			quote_rates &&
			quote_zones &&
			!editInfoLoaded
		) {
			const newData = assignDataToEdit({
				quote_data,
				quote_lines,
				quote_addons,
				quote_rates,
				quote_zones,
			})
			formik.setValues(newData)
			setEditInfoLoaded(true)
		}
	}, [quote_data, quote_lines, quote_addons, quote_rates, quote_zones])

	useEffect(() => {
		if (ratesInfo.data && !editInfoLoaded) {
			formik.setFieldValue('rates', ratesInfo.data)
		}
	}, [ratesInfo.data])

	// Check the zones when the max_zones changes
	useEffect(() => {
		zonesFn.checkZones(
			formik.values.max_zones,
			formik.values.zones,
			formik.setFieldValue
		)
	}, [formik.values.max_zones])

	// Check the quote lines when the zones, rates or estimatedWay changes
	useEffect(() => {
		let newQuoteLines = quoteLinesFn.checkZones(
			formik.values.zones,
			formik.values.quote_lines
		)
		newQuoteLines = quoteLinesFn.calculateQuoteLines(
			formik.values.rates,
			formik.values.estimatedWay,
			newQuoteLines
		)
		formik.setFieldValue('quote_lines', newQuoteLines)
	}, [formik.values.zones, formik.values.rates, formik.values.estimatedWay])

	//Functions to calculate the totals
	useEffect(() => {
		const erectDismantleTotal = totalsFn.calculateEDtotal(
			formik.values.quote_lines
		)

		const additionalTotal = totalsFn.calculateAdditionalTotal(
			formik.values.quote_additional_lines
		)

		const weekTotal = totalsFn.calculateWeekTotal(
			formik.values.quote_lines,
			formik.values.quote_additional_lines
		)

		const total = erectDismantleTotal + additionalTotal + weekTotal

		formik.setFieldValue('erectDismantleTotal', erectDismantleTotal)
		formik.setFieldValue('additionalTotal', additionalTotal)
		formik.setFieldValue('weekTotal', weekTotal)
		formik.setFieldValue('total', total)
	}, [formik.values.quote_lines, formik.values.quote_additional_lines])

	return {
		formik,
		quoteLinesHandlers,
		quoteAdditionalLinesHandlers,
		ratesHandlers,
		zonesHandlers,
		setBackToMainTable,
		itemsTabs,
	}
}
