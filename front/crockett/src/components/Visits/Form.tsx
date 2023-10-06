import {
	DateSelect,
	DateSelectStartEnd,
	Dropdown,
	Input,
	MultiSelect,
	SideModal,
	Spinner,
	TextArea,
	TimeSelect,
} from 'common'
import { useFormik } from 'formik'
import {
	active_inactive_options,
	visitTypeOptions,
	visitsStatusOptions,
} from 'models'
import moment from 'moment'
import {
	JobsServices,
	VisitServices,
	StaffServices,
	VehicleServices,
} from 'services'
import { OptionsForDropdown, OptionsForDropdownFilter } from 'utilities'
import * as Yup from 'yup'

interface IProps {
	visit_id?: number
	job_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	start_date: string
	end_date: string
	job_id: number
	team_leader_id: number
	type: string
	swms_document: string
	notes: string
	comments: string
	staff_ids: number[]
	staff_labels: string[]
	task_ids: number[]
	task_labels: string[]
	visit_status: string
	status: string
	time_on: string
	time_off: string
	vehicle_ids: number[]
	vehicle_labels: string[]
	start_time: string
}

export const VisitForm = ({
	visit_id,
	job_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: visitData, isLoading: visitLoading } =
		VisitServices.useVisitById(visit_id)

	const { createVisit, enumerateDaysBetweenDates } =
		VisitServices.useCreateVisit()

	const { updateVisit } = VisitServices.useUpdateVisit()

	const { data: jobData, isLoading: jobsLoading } = JobsServices.useJobs()

	const { data: TaskData, isLoading: taskIsLoading } = JobsServices.useTask()

	const { data: staffData, isLoading: staffLoading } = StaffServices.useStaff()

	const { data: vehiclesData, isLoading: vehiclesLoading } =
		VehicleServices.useVehicles()

	const initialValues: IinitialValues = {
		start_date: visitData?.date
			? moment(visitData?.date, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		end_date: visitData?.date
			? moment(visitData?.date, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		job_id: visitData?.job_id || job_id || null,
		team_leader_id: visitData?.team_leader_id || null,
		type: visitData?.type || '',
		swms_document: '',
		notes: visitData?.notes || '',
		comments: visitData?.comments || '',
		staff_ids: visitData?.staff_ids || [],
		staff_labels: [],
		task_ids: visitData?.task_ids || [],
		task_labels: [],
		visit_status: visitData?.visit_status || 'Pending Prestart ',
		status: visitData?.status || 'Active',
		time_on: visitData?.time_on || '',
		time_off: '',
		vehicle_ids: visitData?.vehicle_ids || [],
		vehicle_labels: [],
		start_time: '',
	}

	const validationSchema = Yup.object({
		type: Yup.string().required('Type is required'),
		task_ids: Yup.array().required('Required').min(1, 'Task is required'),
		job_id: Yup.string().required('Job is required'),
		team_leader_id: Yup.string().required('Team Leader is required'),
		staff_ids: Yup.array().required('Required').min(1, 'Staff is required'),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'create') {
				const payload = {
					job_id: values.job_id,
					team_leader_id: values.team_leader_id,
					type: values.type,
					notes: values.notes,
					comments: values.comments,
					staff_ids: values.staff_ids,
					staff_labels: values.staff_labels,
					task_ids: values.task_ids,
					task_labels: values.task_labels,
					visit_status: values.visit_status,
					status: values.status,
					time_on: values.time_on,
					vehicle_ids: values.vehicle_ids,
					vehicle_labels: values.vehicle_labels,
				}
				const dates = enumerateDaysBetweenDates(
					values.start_date,
					values.end_date
				)
				for (const iterator of dates) {
					await createVisit({
						...payload,
						date: iterator,
					})
				}
			}
			if (formType === 'update' && visit_id) {
				const payload = {
					date: values.start_date,
					job_id: values.job_id,
					team_leader_id: values.team_leader_id,
					type: values.type,
					notes: values.notes,
					comments: values.comments,
					staff_ids: values.staff_ids,
					staff_labels: values.staff_labels,
					task_ids: values.task_ids,
					task_labels: values.task_labels,
					visit_status: values.visit_status,
					status: values.status,
					time_on: values.time_on,
					vehicle_ids: values.vehicle_ids,
					vehicle_labels: values.vehicle_labels,
				}
				await updateVisit(visit_id, payload)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (
		visit_id &&
		visitLoading &&
		jobsLoading &&
		taskIsLoading &&
		staffLoading &&
		vehiclesLoading
	) {
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
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						{formType === 'create' && (
							<DateSelectStartEnd
								title="Date"
								startID="start_date"
								endID="end_date"
								startDate={formik.values.start_date}
								endDate={formik.values.end_date}
								onChange={formik.setFieldValue}
								error={formik.errors.start_date}
							/>
						)}
						{formType === 'update' && (
							<DateSelect
								title="Date"
								id="start_date"
								value={formik.values?.start_date}
								onChange={formik.setFieldValue}
								error={formik.errors.start_date}
							/>
						)}
					</div>
					<div className="w-1/2">
						<Dropdown
							id="job_id"
							label="Job"
							options={OptionsForDropdownFilter(
								jobData,
								'id',
								['job_num', 'site'],
								'job_status',
								'In Progress'
							)}
							value={`${formik.values.job_id}`}
							onChange={formik.setFieldValue}
							error={formik.errors.job_id}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-full">
						<Dropdown
							id="team_leader_id"
							label="Team Leader"
							options={OptionsForDropdownFilter(
								staffData,
								'id',
								['staff_name'],
								'type',
								'Crew Leader'
							)}
							value={formik.values.team_leader_id}
							onChange={formik.setFieldValue}
							error={formik.errors.team_leader_id}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-full">
						<MultiSelect
							id="staff_ids"
							label="Staff"
							options={OptionsForDropdownFilter(
								staffData,
								'id',
								['staff_name'],
								'status',
								'Active'
							)}
							value={formik.values.staff_ids}
							onChange={formik.setFieldValue}
							error={formik.errors.staff_ids}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-full">
						<MultiSelect
							id="vehicle_ids"
							label="Vehicles"
							options={OptionsForDropdown(vehiclesData, 'id', 'Rego')}
							onChange={formik.setFieldValue}
							value={formik.values.vehicle_ids}
						/>
					</div>
				</div>

				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<TimeSelect
							id="time_on"
							title="Time On"
							onChange={formik.setFieldValue}
							value={formik.values.time_on}
							error={formik.errors.time_on}
						/>
					</div>
					<div className="w-1/2 ">
						<Dropdown
							id="type"
							label="Type"
							options={visitTypeOptions}
							value={formik.values.type}
							onChange={formik.setFieldValue}
							error={formik.errors.type}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-full">
						<MultiSelect
							id="task_ids"
							label="Tasks"
							options={OptionsForDropdownFilter(
								TaskData,
								'id',
								['type'],
								'job_id',
								formik.values.job_id
							)}
							onChange={formik.setFieldValue}
							value={formik.values.task_ids}
							error={formik.errors.task_ids}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="w-full">
						<TextArea
							id="notes"
							title="Notes"
							rows={4}
							type="text"
							error={formik.errors.notes}
							value={formik.values.notes}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-full">
						<Input
							id="comments"
							title="Comment"
							placeholder="Comment"
							type="text"
							error={formik.errors.comments}
							value={formik.values.comments}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
					</div>
				</div>
				{formType === 'update' && (
					<div className="flex items-center justify-between px-2">
						<div className="w-1/2">
							<Dropdown
								id="visit_status"
								label="Visit Status"
								options={visitsStatusOptions}
								value={formik.values.visit_status}
								onChange={formik.setFieldValue}
								error={formik.errors.visit_status}
							/>
						</div>
						<div className="w-1/2">
							<Dropdown
								id="status"
								label="Status"
								options={active_inactive_options}
								value={formik.values.status}
								onChange={formik.setFieldValue}
								error={formik.errors.status}
							/>
						</div>
					</div>
				)}
			</SideModal>
		</>
	)
}
