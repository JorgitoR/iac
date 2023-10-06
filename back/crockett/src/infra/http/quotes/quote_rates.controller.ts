import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IQuoteRatesService } from 'domain/quotes/quote_rates'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Quotes')
@Controller('quotes/:quote_id/rates')
export class QuoteRatesController {
	constructor(
		@Inject('IQuoteRatesService')
		private readonly quoteRatesService: IQuoteRatesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all Rates of a quote' })
	@ApiResponse({
		status: 200,
		description: 'Lines found',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote Rates not found',
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
	async getAllRates(@Param('quote_id') quote_id: number) {
		const response = await this.quoteRatesService.getAllbyQuoteID(quote_id)
		return response
	}

	@Post()
	@ApiOperation({ summary: 'Update the Rates of a quote' })
	@ApiResponse({
		status: 200,
		description: 'Rates updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote Rates not found',
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
	async updateRates(@Param('quote_id') quote_id: number, @Body() body: any) {
		const response = await this.quoteRatesService.update(quote_id, body)
		return response
	}
}
