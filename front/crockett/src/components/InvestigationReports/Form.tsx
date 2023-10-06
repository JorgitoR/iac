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
import { IncidentReportsServices, JobsServices, StaffServices } from 'services'
import * as Yup from 'yup'

interface IProps {
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

export const InvestigationForm = ({
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: staffData, isLoading: staffLoading } = StaffServices.useStaff()
	console.log(staffData)
	const { createJob } = JobsServices.useCreateJob()
	const { data: incidentData, isLoading: incidentLoading } =
		IncidentReportsServices.useIncendentReports()

	const initialValues: IinitialValues = {
		client_id: incidentData?.client_id || '',
		job_type: incidentData?.job_type || '',
		branding: 'Crockett Industries',
		site: incidentData?.site || '',
		start_date: incidentData?.start_date
			? moment(incidentData.start_date).format('DD/MM/YYYY').toString()
			: moment().format('DD/MM/YYYY').toString(),
		end_date: incidentData?.end_date
			? moment(incidentData.end_date).format('DD/MM/YYYY').toString()
			: moment().add(3, 'months').format('DD/MM/YYYY').toString(),
		job_status: incidentData?.job_status || 'Pending Handover',
		notes: incidentData?.notes || '',
		status: incidentData?.status || 'Active',
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
			if (formType === 'update') {
				const JobData = {
					site: values.site,
					start_date: values.start_date,
					end_date: values.end_date,
					job_status: values.job_status,
					notes: values.notes,
				}
				console.log(JobData)
				//await update(job_id, JobData)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (staffLoading || incidentLoading) {
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
								options={[]}
								value={formik.values.client_id}
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
								error={formik.errors.client_id}
							/>
							<Dropdown
								label="Job Type"
								id="job_type"
								options={[]}
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
								options={[]}
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
