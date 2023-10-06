import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator'

export class createContactDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	client_id: number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

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

export class updateContactDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

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
