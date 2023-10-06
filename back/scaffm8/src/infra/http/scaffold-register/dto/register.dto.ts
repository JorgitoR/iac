import { ApiProperty } from '@nestjs/swagger'
import {
	IsString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsDateString,
} from 'class-validator'
export class Register {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	job_id: number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	tag_no: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	last_inspection: Date

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	inspection_due: Date

	@ApiProperty()
	@IsString()
	status: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	handover_doc: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	uploaded_by: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@IsOptional()
	task_id: number
}
