import { DateSelect, Dropdown, Input, SideModal, Spinner } from 'common'
import { useFormik } from 'formik'
import { active_inactive_options } from 'models'
import moment from 'moment'
import { JobsServices, ScaffolRegisterServices } from 'services'
import { OptionsForDropdownFilter } from 'utilities'
import * as Yup from 'yup'

interface IProps {
	tag_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	tag_no: string
	job_id: string
	description: string
	last_inspection: string
	inspection_due: string
	status: string
}

export const ScaffoldRegisterFrom = ({
	tag_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { createVehicle } = ScaffolRegisterServices.useCreateScaffoldRegister()
	const { updateScaffoldRegister } =
		ScaffolRegisterServices.useUpdateScaffoldRegister()
	const { data: tagData, isLoading: tagLoading } =
		ScaffolRegisterServices.useGetTagById(tag_id)
	const { data: jobData, isLoading: jobsLoading } = JobsServices.useJobs()

	const initialValues: IinitialValues = {
		tag_no: tagData?.tag_no || '',
		job_id: tagData?.job_id || '',
		description: tagData?.description || '',
		last_inspection: tagData?.last_inspection
			? moment(tagData?.last_inspection).format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		inspection_due: tagData?.inspection_due
			? moment(tagData?.inspection_due).format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		status: tagData?.status || 'Active',
	}

	const validationSchema = Yup.object({})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'create') {
				const payload = {
					tag_no: values.tag_no,
					job_id: Number(values.job_id),
					description: values.description,
					last_inspection: moment(
						values.last_inspection,
						'DD/MM/YYYY'
					).toDate(),
					inspection_due: moment(values.inspection_due, 'DD/MM/YYYY').toDate(),
					status: values.status,
				}
				await createVehicle(payload)
			}
			if (formType === 'update' && tag_id) {
				const payload = {
					tag_no: values.tag_no,
					job_id: Number(values.job_id),
					description: values.description,
					last_inspection: moment(
						values.last_inspection,
						'DD/MM/YYYY'
					).toDate(),
					inspection_due: moment(values.inspection_due, 'DD/MM/YYYY').toDate(),
					status: values.status,
				}
				await updateScaffoldRegister(tag_id, payload)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (tag_id && (tagLoading || jobsLoading)) {
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
					<div className="w-1/2">
						<Input
							id="tag_no"
							type="text"
							value={formik.values.tag_no}
							error={formik.errors.tag_no}
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Tag No"
							title="Tag No"
						/>
					</div>
					<div className="w-1/2">
						<Dropdown
							id="job_id"
							label="Job"
							onChange={formik.setFieldValue}
							options={OptionsForDropdownFilter(
								jobData,
								'id',
								['job_num', 'site'],
								'status',
								'Active'
							)}
							value={formik.values.job_id}
							onBlur={formik.handleBlur}
							error={formik.errors.job_id}
						/>
					</div>
				</div>
				<div className="flex items-center">
					<div className="w-1/2">
						<Input
							id="description"
							type="text"
							value={formik.values.description}
							error={formik.errors.description}
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Description"
							title="Description"
						/>
					</div>
				</div>
				<div className="flex items-center">
					<div className="w-1/2">
						<DateSelect
							id="last_inspection"
							title="Last Inspection"
							value={formik.values.last_inspection}
							error={formik.errors.last_inspection}
							onChange={formik.setFieldValue}
						/>
					</div>
					<div className="w-1/2">
						<DateSelect
							id="inspection_due"
							title="Inspection Due"
							value={formik.values.inspection_due}
							error={formik.errors.inspection_due}
							onChange={formik.setFieldValue}
						/>
					</div>
				</div>
				<div className="flex items-center">
					<div className="w-full">
						<Dropdown
							id="status"
							label="Status"
							onChange={formik.setFieldValue}
							options={active_inactive_options}
							value={formik.values.status}
							onBlur={formik.setFieldTouched}
							error={formik.errors.status}
						/>
					</div>
				</div>
			</SideModal>
		</>
	)
}
