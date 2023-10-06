import {
	Address,
	DateSelect,
	Dropdown,
	Input,
	SideModal,
	Spinner,
} from 'common'
import { useFormik } from 'formik'
import { IStaffRow, StaffStatus, StaffType } from 'models/staff.model'
import { StaffServices } from 'services'
import * as Yup from 'yup'
import {
	BuildingPassport,
	DriverLicence,
	FirstAid,
	HealthSafety,
} from './FormComponents'

interface IProps {
	staff_id?: string | number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

const statusOptions = [
	{ label: 'Active', value: 'Active' },
	{ label: 'Inactive', value: 'Inactive' },
]

const yesNoOptions = [
	{ label: 'Yes', value: 'Yes' },
	{ label: 'No', value: 'No' },
]

const userTypeOptions = [
	{ label: 'Standard', value: 'Standard' },
	{ label: 'Admin', value: 'Admin' },
]

const typeOptions = [
	{ value: 'Employee', label: 'Employee' },
	{ value: 'Crew Leader', label: 'Crew Leader' },
	{ value: 'Office', label: 'Office' },
	{ value: 'Scaffolder', label: 'Scaffolder' },
	{ value: 'Truck Driver', label: 'Truck Driver' },
	{ value: 'Application', label: 'Application' },
	{ value: 'Contractor', label: 'Contractor' },
	{ value: 'Yard Person', label: 'Yard Person' },
]

export const StaffForm = ({
	staff_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data, isLoading } = StaffServices.useStaffById(staff_id)
	const staffListData = StaffServices.useStaff()
	const { createStaff } = StaffServices.useCreateStaff()
	const { updateStaff } = StaffServices.useUpdateStaff()

	const initialValues: IStaffRow = {
		// user type
		userType: data?.userType || 'Standard',

		// access to portal
		accessToPortal: data?.accessToPortal || 'No',

		// access to mobile
		accessToMobile: data?.accessToMobile || 'No',

		// Main Staff Details
		staff_name: data?.staff_name || '',
		type: data?.type || StaffType['N/A'],
		mobile: data?.mobile || '',
		email: data?.email || '',
		position: data?.position || '',
		street: data?.street || '',
		street_2: data?.street_2 || '',
		city: data?.city || '',
		post_code: data?.post_code || '',
		pin: data?.pin || '',
		start_date: data?.start_date || '',
		dob: data?.dob || '',

		// Drivers Licence Section
		driver_licence: data?.driver_licence || '',
		licence_type: data?.licence_type || '',
		licence_class2: data?.licence_class2 || '[]',
		endorsement: data?.endorsement || '',
		endorsement_complete_date: data?.endorsement_complete_date || '',
		endorsement_expiry: data?.endorsement_expiry || '',
		photo_front: data?.photo_front || '',
		photo_back: data?.photo_back || '',
		licence_assessed_by: data?.licence_assessed_by || '',

		// Health & Safety Section
		induction_date: data?.induction_date || '',
		expiry_date: data?.expiry_date || '',
		photo: data?.photo || '',
		hs_assessed_by: data?.hs_assessed_by || '',

		// Building construction section
		passport_num: data?.passport_num || '',
		passport_type: data?.passport_type || '',
		passport_issue: data?.passport_issue || '',
		passport_expiry: data?.passport_expiry || '',
		passport_photo: data?.passport_photo || '',
		site_safe_assessed_by: data?.site_safe_assessed_by || '',

		// First aid section
		first_aid_issue: data?.first_aid_issue || '',
		first_aid_expiry: data?.first_aid_expiry || '',
		first_aid_photo: data?.first_aid_photo || '',
		firstaid_assessed_by: data?.firstaid_assessed_by || '',

		// Safe Cert section
		cert_num: data?.cert_num || '',
		cert_issue_date: data?.cert_issue_date || '',
		cert_expiry_date: data?.cert_expiry_date || '',
		cert_photo: data?.cert_photo || '',
		scaff_cert_assessed_by: data?.scaff_cert_assessed_by || '',

		// Safe Op section
		sop_train: data?.sop_train || '',

		// Other section
		height_training: data?.height_training || '',
		height_training_issue: data?.height_training_issue || '',
		height_training_expiry: data?.height_training_expiry || '',
		height_training_assessed_by: data?.height_training_assessed_by || '',
		other_photo: data?.other_photo || '',
		ird_num: data?.ird_num || '',
		last_drug_test: data?.last_drug_test || '',
		kiwisaver: data?.kiwisaver || '',
		employement_contract: data?.employement_contract || '',

		status: data?.status || StaffStatus.Active,
	}

	const validationSchema = Yup.object({
		staff_name: Yup.string().required('Staff name is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			const StaffData: IStaffRow = { ...values }
			if (formType === 'create') {
				await createStaff(StaffData)
			}
			if (formType === 'update' && staff_id) {
				await updateStaff(StaffData, staff_id)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (staff_id && isLoading) {
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
					<Input
						title="Staff Name"
						id="staff_name"
						type="text"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.staff_name}
						placeholder=""
						error={formik.errors.staff_name}
					/>
					<Dropdown
						label="Type"
						id="type"
						options={typeOptions}
						value={String(formik.values.type)}
						onChange={formik.setFieldValue}
						onBlur={formik.setFieldTouched}
					/>
				</div>
				<div className="flex items-center px-2">
					<Input
						title="Contact #"
						id="mobile"
						type="text"
						icon="phone"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.mobile}
						placeholder=""
					/>
					<Input
						title="Contact Email"
						id="email"
						type="email"
						icon="email"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.email}
						placeholder=""
						error={formik.errors.email}
					/>
				</div>
				<div className="flex items-center px-2">
					<Dropdown
						label="Access To Portal"
						id="accessToPortal"
						options={yesNoOptions}
						value={formik.values.accessToPortal}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
					/>
				</div>
				{formik.values.accessToPortal === 'Yes' && (
					<div className="flex items-center px-2">
						<Dropdown
							label="User Type"
							id="userType"
							options={userTypeOptions}
							value={formik.values.userType}
							onChange={formik.setFieldValue}
							onBlur={formik.handleBlur}
						/>
					</div>
				)}
				<div className="flex items-center px-2">
					<Input
						title="Position"
						id="position"
						type="text"
						placeholder=""
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.position}
					/>
					<Input
						title="PIN"
						id="pin"
						type="text"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.pin}
						placeholder="Pin"
						error={formik.errors.pin}
					/>
				</div>
				<Address
					streetId="street"
					streetId2="street_2"
					cityId="city"
					postalId="post_code"
					streetVal={formik.values.street}
					street_2Val={formik.values.street_2}
					cityVal={formik.values.city}
					postalVal={formik.values.post_code}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
				/>
				<div className="flex items-center px-2">
					<DateSelect
						title="Start Date"
						id="start_date"
						value={formik.values.start_date}
						onChange={formik.setFieldValue}
					/>
					<DateSelect
						title="Date of Birth"
						id="dob"
						value={formik.values.dob}
						onChange={formik.setFieldValue}
					/>
				</div>

				<DriverLicence
					values={formik.values}
					staff={staffListData.data}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					setFieldValue={formik.setFieldValue}
					setFieldTouched={formik.setFieldTouched}
				/>
				<HealthSafety
					values={formik.values}
					staff={staffListData.data}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					setFieldValue={formik.setFieldValue}
					setFieldTouched={formik.setFieldTouched}
				/>
				<BuildingPassport
					values={formik.values}
					staff={staffListData.data}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					setFieldValue={formik.setFieldValue}
					setFieldTouched={formik.setFieldTouched}
				/>
				<FirstAid
					values={formik.values}
					staff={staffListData.data}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					setFieldValue={formik.setFieldValue}
					setFieldTouched={formik.setFieldTouched}
				/>
				<div className="w-1/2 pl-2">
					<Dropdown
						label="Status"
						id="status"
						options={statusOptions}
						value={String(formik.values.status)}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
					/>
				</div>
			</SideModal>
		</>
	)
}
