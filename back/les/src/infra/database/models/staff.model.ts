import { Column, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'staff', underscored: true })
export class Staff extends Model<Staff> {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number

	@Column
	staff_name: string

	@Column
	type: string

	@Column
	position: string

	@Column
	pin: string

	@Column({ unique: true, allowNull: false })
	email: string

	@Column
	mobile: string

	@Column
	company_supplied: string

	@Column
	street: string

	@Column
	street_2: string

	@Column
	city: string

	@Column
	post_code: string

	@Column
	dob: string

	@Column
	start_date: string

	@Column
	forms_assigned: string

	@Column
	driver_licence: string

	@Column
	licence_type: string

	@Column
	endorsement_complete_date: string

	@Column
	endorsement_expiry: string

	@Column
	expiry: string

	@Column
	photo_front: string

	@Column
	photo_back: string

	@Column
	induction_date: string

	@Column
	expiry_date: string

	@Column
	photo: string

	@Column
	passport_num: string

	@Column
	status: string

	@Column
	sop_traa: string

	@Column
	in_out_time: string

	@Column
	licence_endorcement: string

	@Column({ defaultValue: 'Signed Out' })
	work_status: string

	@Column
	first_aid_issue: string

	@Column
	first_aid_expiry: string

	@Column
	first_aid_photo: string

	@Column
	cert_num: string

	@Column
	cert_issue_date: string

	@Column
	cert_expiry_date: string

	@Column
	cert_photo: string

	@Column
	height_training: string

	@Column
	height_training_expiry: string

	@Column
	other_photo: string

	@Column
	ird_num: string

	@Column
	last_drug_test: string

	@Column
	kiwisaver: string

	@Column
	employement_contract: string

	@Column
	endorsement: string

	@Column
	safe_ops: string

	@Column
	passport_type: string

	@Column
	passport_issue: string

	@Column
	passport_expiry: string

	@Column
	passport_photo: string

	@Column({ field: 'licence_class2' })
	licence_class2: string

	@Column({ field: 'sop_train ' })
	sop_train: string

	@Column
	licence_assessed_by: string

	@Column
	hs_assessed_by: string

	@Column
	site_safe_assessed_by: string

	@Column
	firstaid_assessed_by: string

	@Column
	scaff_cert_assessed_by: string

	@Column
	height_training_issue: string

	@Column
	height_training_assessed_by: string

	@Column
	next_of_kin_name: string

	@Column
	next_of_kin_phone: string

	@Column
	next_of_kin_email: string

	@Column
	scaffold_certificate_photo: string

	@Column({ field: 'accessToPortal', defaultValue: 'No' })
	accessToPortal: string

	@Column({ field: 'accessToMobile', defaultValue: 'No' })
	accessToMobile: string

	@Column({ field: 'userType', defaultValue: 'standard' })
	userType: string
}
