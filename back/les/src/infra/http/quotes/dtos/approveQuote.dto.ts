import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class approveQuoteDTO {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	appovedBy: string

	@ApiProperty()
	@IsString()
	approveComment: string
}
