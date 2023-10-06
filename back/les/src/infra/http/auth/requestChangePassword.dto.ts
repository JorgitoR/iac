import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class RequestResetPasswordDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string
}
