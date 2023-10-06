import {
	DateSelect,
	Dropdown,
	Input,
	SideModal,
	Spinner,
	TextArea,
} from 'common'
import { useFormik } from 'formik'
import { active_inactive_options } from 'models'
import { job_status_options, job_status_options_Edit } from 'models/jobs.model'
import moment from 'moment'
import { ClientServices, JobsServices } from 'services'
import { OptionsForDropdown } from 'utilities'
import * as Yup from 'yup'

const jobTypeOptions = [
	{
		value: 'Residential',
		label: 'Residential',
	},
	{
		value: 'Construction',
		label: 'Construction',
	},
	{
		value: 'Civil',
		label: 'Civil',
	},
	{
		value: 'Commercial',
		label: 'Commercial',
	},
]

const brandingOptions = [
	{
		value: 'Leading Scaffolding',
		label: 'Leading Scaffolding',
	},
]

interface IProps {
	job_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	client_id: string
	job_type: string
	branding: string
	site: string
	start_date: string
	end_date: string
	job_status: string
	notes: string
	status: string
}

export const JobForm = ({
	job_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: clientsData, isLoading: clientsLoading } =
		ClientServices.useClients()

	const { createJob } = JobsServices.useCreateJob()
	const { update } = JobsServices.useUpdateJob()
	const { data: jobData } = JobsServices.useJobById(job_id || undefined)

	const initialValues: IinitialValues = {
		client_id: jobData?.client_id || '',
		job_type: jobData?.job_type || '',
		branding: 'Les',
		site: jobData?.site || '',
		start_date: jobData?.start_date
			? moment(jobData.start_date).format('DD/MM/YYYY').toString()
			: moment().format('DD/MM/YYYY').toString(),
		end_date: jobData?.end_date
			? moment(jobData.end_date).format('DD/MM/YYYY').toString()
			: moment().add(3, 'months').format('DD/MM/YYYY').toString(),
		job_status: jobData?.job_status || 'Pending Handover',
		notes: jobData?.notes || '',
		status: jobData?.status || 'Active',
	}

	const validationSchema = Yup.object({
		client_id: Yup.string().required('The client is required'),
		job_type: Yup.string().required('The job type is required'),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'create') {
				const JobData = {
					client_id: values.client_id,
					job_type: values.job_type,
					branding: values.branding,
					site: values.site,
					start_date: values.start_date,
					end_date: values.end_date,
				}
				await createJob(JobData)
			}
			if (formType === 'update' && job_id) {
				const JobData = {
					site: values.site,
					start_date: values.start_date,
					end_date: values.end_date,
					job_status: values.job_status,
					notes: values.notes,
					status: values.status,
				}
				await update(job_id, JobData)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (job_id && clientsLoading) {
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
				{formType === 'create' && (
					<>
						<div className="flex items-center px-3">
							<Dropdown
								label="Client"
								id="client_id"
								options={OptionsForDropdown(clientsData, 'id', 'client_name')}
								value={formik.values.client_id}
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
								error={formik.errors.client_id}
							/>
							<Dropdown
								label="Job Type"
								id="job_type"
								options={jobTypeOptions}
								value={formik.values.job_type}
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
								error={formik.errors.job_type}
							/>
						</div>
						<div className="flex items-center px-3">
							<Dropdown
								label="Branding"
								id="branding"
								options={brandingOptions}
								value={formik.values.branding}
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
							/>
							<Input
								title="Site"
								id="site"
								type="text"
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
								value={formik.values.site}
								placeholder="Site"
								error={formik.errors.site}
							/>
						</div>
					</>
				)}
				<div className="flex items-center px-3">
					<DateSelect
						title="Start Date"
						id="start_date"
						value={formik.values.start_date}
						onChange={formik.setFieldValue}
					/>
					<DateSelect
						title="Finish Date"
						id="end_date"
						value={formik.values.end_date}
						onChange={formik.setFieldValue}
					/>
				</div>
				{formType === 'update' && (
					<div className="flex items-center px-1">
						<TextArea
							id="notes"
							title="Notes"
							value={formik.values.notes}
							error={formik.errors.notes}
							rows={6}
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
						/>
					</div>
				)}
				<div className="flex items-center px-3">
					<div className="w-1/2">
						<Dropdown
							label="Job Status"
							id="job_status"
							options={
								formType === 'create'
									? job_status_options
									: job_status_options_Edit
							}
							value={formik.values.job_status}
							onChange={formik.setFieldValue}
							onBlur={formik.setFieldTouched}
							disabled={formType === 'create'}
						/>
					</div>
					<div className="w-1/2">
						{formType === 'update' && (
							<Dropdown
								label="Status"
								id="status"
								options={active_inactive_options}
								value={formik.values.status}
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
							/>
						)}
					</div>
				</div>
			</SideModal>
		</>
	)
}
