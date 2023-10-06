import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class ResetPasswordDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	token: string
}
