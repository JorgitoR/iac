import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, Allow } from 'class-validator'

export class CreateFirstUserDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	staff_name: string

	@ApiProperty()
	@IsString()
	type: string

	@ApiProperty()
	@IsString()
	position: string

	@ApiProperty()
	@IsString()
	pin: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsString()
	mobile: string

	@ApiProperty()
	@IsString()
	street: string

	@ApiProperty()
	@IsString()
	street_2: string

	@ApiProperty()
	@IsString()
	city: string

	@ApiProperty()
	@IsString()
	post_code: string

	@ApiProperty()
	@IsString()
	dob: string

	@ApiProperty()
	@IsString()
	start_date: string

	@ApiProperty()
	@IsString()
	driver_licence: string

	@ApiProperty()
	@IsString()
	licence_type: string

	@ApiProperty()
	@IsString()
	endorsement_complete_date: string

	@ApiProperty()
	@IsString()
	endorsement_expiry: string

	@ApiProperty()
	@IsString()
	photo_front: string

	@ApiProperty()
	@IsString()
	photo_back: string

	@ApiProperty()
	@IsString()
	induction_date: string

	@ApiProperty()
	@IsString()
	expiry_date: string

	@ApiProperty()
	@IsString()
	photo: string

	@ApiProperty()
	@IsString()
	passport_num: string

	@ApiProperty()
	@IsString()
	status: string

	@ApiProperty()
	@IsString()
	first_aid_issue: string

	@ApiProperty()
	@IsString()
	first_aid_expiry: string

	@ApiProperty()
	@IsString()
	first_aid_photo: string

	@ApiProperty()
	@IsString()
	cert_num: string

	@ApiProperty()
	@IsString()
	cert_issue_date: string

	@ApiProperty()
	@IsString()
	cert_expiry_date: string

	@ApiProperty()
	@IsString()
	cert_photo: string

	@ApiProperty()
	@IsString()
	height_training: string

	@ApiProperty()
	@IsString()
	height_training_expiry: string

	@ApiProperty()
	@IsString()
	other_photo: string

	@ApiProperty()
	@IsString()
	ird_num: string

	@ApiProperty()
	@IsString()
	last_drug_test: string

	@ApiProperty()
	@IsString()
	kiwisaver: string

	@ApiProperty()
	@IsString()
	employement_contract: string

	@ApiProperty()
	@IsString()
	endorsement: string

	@ApiProperty()
	@IsString()
	passport_type: string

	@ApiProperty()
	@IsString()
	passport_issue: string

	@ApiProperty()
	@IsString()
	passport_expiry: string

	@ApiProperty()
	@IsString()
	passport_photo: string

	@ApiProperty()
	@IsString()
	licence_assessed_by: string

	@ApiProperty()
	@Allow()
	licence_class2: unknown

	@ApiProperty()
	@Allow()
	sop_train: unknown

	@ApiProperty()
	@IsString()
	hs_assessed_by: string

	@ApiProperty()
	@IsString()
	site_safe_assessed_by: string

	@ApiProperty()
	@IsString()
	firstaid_assessed_by: string

	@ApiProperty()
	@IsString()
	scaff_cert_assessed_by: string

	@ApiProperty()
	@IsString()
	height_training_issue: string

	@ApiProperty()
	@IsString()
	height_training_assessed_by: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	accessToPortal: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	accessToMobile: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userType: string
}
