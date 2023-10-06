import { DateSelect, Input, SideModal, Spinner, TextArea } from 'common'
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect } from 'react'
import { JobsServices } from 'services'
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

	const initialValues: IinitialValues = {
		description: data?.description || '',
		percentage_erect: data?.percentage_erect || 0,
		percentage_dismantle: data?.percentage_dismantle || 0,
		percentage_complete: data?.percentage_complete || 0,
		total_hours: data?.total_hours || 0,
		LastEditDate: data?.LastEditDate
			? moment(data?.LastEditDate).format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
	}

	const validationSchema = Yup.object({
		description: Yup.string().required('Description is required'),
		percentage_erect: Yup.number().typeError('Percentage Erect must be number'),
		percentage_dismantle: Yup.number().typeError(
			'Percentage Dismantle must be number'
		),
		total_hours: Yup.number().typeError('Total Hours must be number'),
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
			</SideModal>
		</>
	)
}
