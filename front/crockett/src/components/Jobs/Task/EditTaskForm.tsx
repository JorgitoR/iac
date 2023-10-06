import {
	DateSelect,
	Dropdown,
	Input,
	SideModal,
	Spinner,
	TextArea,
} from 'common'
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect } from 'react'
import { ContactServices, JobsServices } from 'services'
import { OptionsForDropdown } from 'utilities'
import * as Yup from 'yup'

interface IProps {
	task_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	description: string
	percentage_erect: number
	percentage_dismantle: number
	percentage_complete: number
	total_hours: number
	LastEditDate: string
	PO_Number: string | number
	Requester: string
}

export const EditTaskForm = ({
	task_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data, isLoading } = JobsServices.useJobTaskById(task_id)
	const { udpateTask } = JobsServices.useUpdateJobTask()

	const { data: contactsData } = ContactServices.useContacts()

	const initialValues: IinitialValues = {
		description: data?.description || '',
		percentage_erect: data?.percentage_erect || 0,
		percentage_dismantle: data?.percentage_dismantle || 0,
		percentage_complete: data?.percentage_complete || 0,
		total_hours: data?.total_hours || 0,
		LastEditDate: data?.LastEditDate
			? moment(data?.LastEditDate).format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		PO_Number: data?.PO_Number || '',
		Requester: data?.Requester || '',
	}

	const validationSchema = Yup.object({
		description: Yup.string().required('Description is required'),
		percentage_erect: Yup.number().typeError('Percentage Erect must be number'),
		percentage_dismantle: Yup.number().typeError(
			'Percentage Dismantle must be number'
		),
		total_hours: Yup.number().typeError('Total Hours must be number'),
		PO_Number: Yup.string().when('formType', () => {
			if (formType === 'update') {
				return Yup.string().required('PO Number is required')
			}
			return Yup.string()
		}),
		Requester: Yup.string().when('formType', () => {
			if (formType === 'update') {
				return Yup.string().required('Requester is required')
			}
			return Yup.string()
		}),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true)

			const {
				description,
				percentage_erect,
				percentage_dismantle,
				total_hours,
			} = values

			const data = {
				description,
				percentage_erect,
				percentage_dismantle,
				total_hours,
				LastEditDate: moment(values.LastEditDate, 'DD/MM/YYYY').toDate(),
				PO_Number: values.PO_Number,
				Requester: values.Requester,
			}

			if (task_id) await udpateTask(task_id, data)

			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	useEffect(() => {
		const percentage_total = Number(
			(
				Number(formik.values.percentage_erect * 0.7) +
				Number(formik.values.percentage_dismantle * 0.3)
			).toFixed(2)
		)
		formik.setFieldValue('percentage_complete', percentage_total)
	}, [formik.values.percentage_erect, formik.values.percentage_dismantle])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<SideModal
				heading={heading}
				open={open}
				setOpen={setOpen}
				handleSubmit={formik.handleSubmit}
				isLoading={formik.isSubmitting}
				formType={formType}>
				<div className="flex items-center">
					<TextArea
						id="description"
						title="description"
						value={formik.values.description}
						error={formik.errors.description}
						rows={6}
						handleBlur={formik.handleBlur}
						handleChange={formik.handleChange}
					/>
				</div>
				<div className="flex items-center">
					<Input
						title="Percentage Dismantle"
						id="percentage_dismantle"
						type="number"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.percentage_dismantle}
						placeholder="Percentage Dismantle"
						error={formik.errors.percentage_dismantle}
					/>
					<Input
						title="Percentage Erect"
						id="percentage_erect"
						type="number"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.percentage_erect}
						placeholder="Percentage Erect"
						error={formik.errors.percentage_erect}
					/>
					<Input
						title="Percetage Complete"
						id="percentage_complete"
						type="number"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.percentage_complete}
						placeholder="Percetage Complete"
						error={formik.errors.percentage_complete}
					/>
				</div>

				<div className="flex items-center">
					<Input
						title="Total Hours"
						id="total_hours"
						type="number"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.total_hours}
						placeholder="Total Hours"
						error={formik.errors.total_hours}
					/>
					<DateSelect
						title="Last Edit Date"
						id="LastEditDate"
						value={formik.values.LastEditDate}
						onChange={formik.setFieldValue}
					/>
				</div>
				{formType === 'update' && (
					<div className="flex items-center">
						<div className="w-1/2">
							<Dropdown
								id="Requester"
								label="Requester"
								options={OptionsForDropdown(contactsData, 'name', 'name')}
								value={formik.values.Requester}
								onChange={formik.setFieldValue}
								onBlur={formik.handleBlur}
								error={formik.errors.Requester}
							/>
						</div>
						<div className="w-1/2">
							<Input
								title="PO Number"
								id="PO_Number"
								type="text"
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
								value={formik.values.PO_Number}
								placeholder="PO Number"
								error={formik.errors.PO_Number}
							/>
						</div>
					</div>
				)}
			</SideModal>
		</>
	)
}
