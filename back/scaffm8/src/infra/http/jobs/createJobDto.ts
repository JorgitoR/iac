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

export class CreateJobDto {
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	client_id: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	job_type: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	branding: string

	@ApiProperty()
	@IsString()
	site: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	start_date: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	end_date: string
}
