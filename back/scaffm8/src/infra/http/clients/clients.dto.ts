import { ApiProperty } from '@nestjs/swagger'
import {
	IsString,
	IsEmail,
	IsNotEmpty,
	isNotEmpty,
	IsNumber,
	IsNumberString,
} from 'class-validator'

export class createClientDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	client_name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsString()
	phone: string | number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	status: string
}

export class updateClientDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	client_name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsString()
	phone: string | number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	status: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	main_contact: number
}
