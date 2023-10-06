export interface IStaffRow {
	id?: string
	userType: 'Standard' | 'Admin'
	accessToPortal: 'Yes' | 'No'
	accessToMobile: 'Yes' | 'No'
	staff_name: string
	type: StaffType
	mobile: string
	email: string
	position: string
	street: string
	street_2: string
	city: string
	post_code: string
	pin: string
	start_date: string
	dob: string
	driver_licence: string
	licence_type: string
	licence_class2: string
	endorsement: string
	endorsement_complete_date: string
	endorsement_expiry: string
	photo_front: string
	photo_back: string
	licence_assessed_by: string
	induction_date: string
	expiry_date: string
	photo: string
	hs_assessed_by: string
	passport_num: string
	passport_type: string
	passport_issue: string
	passport_expiry: string
	passport_photo: string
	site_safe_assessed_by: string
	first_aid_issue: string
	first_aid_expiry: string
	first_aid_photo: string
	firstaid_assessed_by: string
	cert_num: string
	cert_issue_date: string
	cert_expiry_date: string
	cert_photo: string
	scaff_cert_assessed_by: string
	sop_train: string
	height_training: string
	height_training_issue: string
	height_training_expiry: string
	height_training_assessed_by: string
	other_photo: string
	ird_num: string
	last_drug_test: string
	kiwisaver: string
	employement_contract: string
	status: StaffStatus
	next_of_kin_name: string
	next_of_kin_phone: string
	next_of_kin_email: string
	scaffold_certificate_photo: string
}

export enum StaffType {
	'Employee',
	'Crew Leader',
	'Office',
	'Scaffolder',
	'Truck Driver',
	'Application',
	'Contractor',
	'Yard Person',
	'N/A' = '',
}

export enum StaffStatus {
	Active = 'Active',
	Inactive = 'Inactive',
}

export const StaffTypeOptions = Object.values(StaffType)
	.filter((v) => typeof v === 'string')
	.map((v) => v) as string[]

export const StaffStatusOptions = Object.values(StaffStatus)
	.filter((v) => typeof v === 'string')
	.map((v) => v) as string[]
