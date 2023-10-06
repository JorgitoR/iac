import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IQuoteLinesService } from 'domain/quotes/quote_lines'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Quotes')
@Controller('quotes/:quote_id/lines')
export class QuoteLinesController {
	constructor(
		@Inject('IQuoteLinesService')
		private readonly quoteLinesService: IQuoteLinesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all lines of a quote' })
	@ApiResponse({
		status: 200,
		description: 'Lines found',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote Lines not found',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async getAllLines(@Param('quote_id') quote_id: number) {
		const response = await this.quoteLinesService.getAllbyQuoteID(quote_id)
		return response
	}

	@Post()
	@ApiOperation({ summary: 'Update the lines of a quote' })
	@ApiResponse({
		status: 200,
		description: 'Lines updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote Lines not found',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async updateLines(@Param('quote_id') quote_id: number, @Body() body: any) {
		const response = await this.quoteLinesService.Upsert(quote_id, body)
		return response
	}
}
