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
import { JobsServices, ContactServices } from 'services'
import { OptionsForDropdown } from 'utilities'
import * as Yup from 'yup'

interface IProps {
	job_id?: number
	task_id?: number
	client_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	PO_Number: string
	Requester: string
	type: string
	description: string
	total_hours: number
	percentage_erect: number
	percentage_dismantle: number
	percentage_complete: number
	LastEditDate: string
	hire_rate: number | null
	task_value: number | null
}

const optionsForType = [
	{ label: 'Install', value: 'Install' },
	{ label: 'Dismantle', value: 'Dismantle' },
	{
		label: 'Adjustment',
		value: 'Adjustment',
	},
]
export const VariationTaskForm = ({
	job_id,
	task_id,
	client_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { createVariationTask } = JobsServices.useCreateVariationTask()
	//const { udpateTask } = JobsServices.useUpdateJobTask()
	const { data, isLoading } = JobsServices.useJobTaskById(task_id)

	const { data: contactsData, isLoading: contactsLoading } =
		ContactServices.useContactsByClientId(client_id)

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
		type: data?.type || '',
		hire_rate: data?.hire_rate || 0,
		task_value: data?.task_value || 0,
	}

	const validationSchema = Yup.object({
		PO_Number: Yup.string().required('PO Number is required'),
		Requester: Yup.string().required('Requester is required'),
		type: Yup.string().required('Type is required'),
		description: Yup.string().required('Description is required'),
		percentage_erect: Yup.number().typeError('Percentage Erect must be number'),
		percentage_dismantle: Yup.number().typeError(
			'Percentage Dismantle must be number'
		),
		hire_rate: Yup.number()
			.typeError('Hire Rate must be number')
			.required('Weekly Hire Rate is required'),
		total_hours: Yup.number()
			.typeError('Total Hours must be number')
			.required('Total Hours is required'),
		task_value: Yup.number()
			.typeError('Task Value must be number')
			.required('Task Value is required'),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true)

			if (formType === 'create') {
				const {
					PO_Number,
					Requester,
					description,
					percentage_erect,
					percentage_dismantle,
					total_hours,
					task_value,
					hire_rate,
				} = values

				const data = {
					PO_Number,
					Requester,
					description,
					percentage_erect,
					percentage_dismantle,
					total_hours,
					LastEditDate: moment(values.LastEditDate, 'DD/MM/YYYY').toDate(),
					task_value,
					hire_rate,
				}

				if (job_id) await createVariationTask(Number(job_id), data)
			}

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

	if (isLoading || contactsLoading) {
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
				<div className="flex items-center px-2">
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
				</div>
				{formType === 'create' && (
					<div className="flex items-center px-2">
						<Dropdown
							id="type"
							label="Type"
							options={optionsForType}
							value={formik.values.type}
							onChange={formik.setFieldValue}
							onBlur={formik.handleBlur}
							error={formik.errors.type}
						/>
					</div>
				)}
				<div className="flex items-center">
					<TextArea
						id="description"
						title="Description"
						value={formik.values.description}
						error={formik.errors.description}
						rows={6}
						handleBlur={formik.handleBlur}
						handleChange={formik.handleChange}
					/>
				</div>
				{formType === 'update' && (
					<div className="flex items-center px-2">
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
				)}

				<div className="flex items-center px-2">
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
					{formType === 'update' && (
						<DateSelect
							title="Last Edit Date"
							id="LastEditDate"
							value={formik.values.LastEditDate}
							onChange={formik.setFieldValue}
						/>
					)}
				</div>
				{formType === 'create' && (
					<div className="flex items-center px-2">
						<div className="w-1/2">
							<Input
								title="Weekly Hire Rate"
								id="hire_rate"
								type="number"
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
								value={`${formik.values.hire_rate}`}
								placeholder="Hire Rate"
								error={formik.errors.hire_rate}
							/>
						</div>
						<div className="w-1/2">
							<Input
								title="Task Value"
								id="task_value"
								type="number"
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
								value={`${formik.values.task_value}`}
								placeholder="Task Value"
								error={formik.errors.task_value}
							/>
						</div>
					</div>
				)}
			</SideModal>
		</>
	)
}
