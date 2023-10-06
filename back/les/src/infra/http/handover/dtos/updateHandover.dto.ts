import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsNotEmpty,
	ValidateNested,
	IsString,
	IsNumber,
	IsOptional,
	IsNumberString,
} from 'class-validator'

export class UpdateHandoverDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	billing_address: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	credit_check: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	work_safe: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	sssp_added: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	hs_officer_phone: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	hs_officer_email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	site_forman_email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	site_forman_phone: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	gear_shortages: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	allowed_quote: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	engaged_engineer: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	staff_availability: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	booked_shrinkwrappers: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	credit_check_who: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	credit_check_when: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	swms_added: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	worksafe_uploaded: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	worksafe_uploaded_when: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	hs_officer: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	site_forman: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	invoiceType: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	hs_officer_client: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	hs_officer_client_number: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	hs_officer_client_email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	site_forman2: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	site_forman_phone2: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	site_forman_email2: string

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	operation_assignee: number
}
