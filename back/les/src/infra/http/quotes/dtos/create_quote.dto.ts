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

enum estimatedWay {
	Hours = 'Hours',
	TotalED = 'Total ED',
	SQM = 'SQM',
}

class IQuoteLine {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	id: number

	@ApiProperty()
	@IsNumber()
	zone_id: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	zone_label: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	length: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	height: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	width: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	total_dimensions: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	quantity: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	total_days: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	erect_and_dismantle: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	percentage_weekly_hire_fee: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	weekly_hire_fee: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	total: string
}

class IQuoteAdditionalLines {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	id: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	duration_quantity: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	fixed_charge: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	total_cost: number
}

class IRates {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	id: number | null

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	service: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	fee: number
}

class IQuoteZones {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	id: number | null

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	zone_id: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	zone_label: string
}

export class createQuoteDTO {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	quote_type: string

	@ApiProperty()
	@IsNumberString()
	@IsNotEmpty()
	max_zones: number

	@ApiProperty()
	@IsOptional()
	PO_Number: string

	@ApiProperty()
	@IsOptional()
	variation_job_id: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	job_type: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	client: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	client_contact: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	scope_of_work: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	estimator: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	fullAddress: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	street: string

	@ApiProperty()
	@IsString()
	@IsString()
	@IsOptional()
	street2: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	city: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	postal: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	longitude: number

	@ApiProperty()
	@IsString()
	@IsOptional()
	latitude: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	estimatedWay: estimatedWay | null

	@ApiProperty({ type: [IQuoteLine] })
	@ValidateNested({ each: true })
	@Type(() => IQuoteLine)
	quote_lines: IQuoteLine[]

	@ApiProperty({ type: [IQuoteAdditionalLines] })
	@ValidateNested({ each: true })
	@Type(() => IQuoteAdditionalLines)
	quote_additional_lines: IQuoteAdditionalLines[]

	@ApiProperty()
	@IsString()
	@IsOptional()
	terms: string

	@ApiProperty()
	@IsNumber()
	erectDismantleTotal: number

	@ApiProperty()
	@IsNumber()
	additionalTotal: number

	@ApiProperty()
	@IsNumber()
	weekTotal: number

	@ApiProperty()
	@IsNumber()
	total: number

	@ApiProperty({ type: [IRates] })
	@ValidateNested({ each: true })
	@Type(() => IRates)
	rates: IRates[]

	@ApiProperty({ type: [IQuoteZones] })
	@ValidateNested({ each: true })
	@Type(() => IQuoteZones)
	zones: IQuoteZones[]
}
