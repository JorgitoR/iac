import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string
}
