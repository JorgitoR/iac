import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IQuotesAddOnsService } from 'domain/quotes/quote_addons'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Quotes')
@Controller('quotes/:quote_id/addons')
export class QuoteAddonsController {
	constructor(
		@Inject('IQuotesAddOnsService')
		private readonly quotesAddOnsService: IQuotesAddOnsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all addons of a quote' })
	@ApiResponse({
		status: 200,
		description: 'Addons found',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote Addons not found',
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
	async getAllAddons(@Param('quote_id') quote_id: number) {
		const response = await this.quotesAddOnsService.getAllbyQuoteID(quote_id)
		return response
	}

	@Post()
	@ApiOperation({ summary: 'Update the addons of a quote' })
	@ApiResponse({
		status: 200,
		description: 'Addons updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote Addons not found',
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
	async updateAddons(@Param('quote_id') quote_id: number, @Body() addons: any) {
		const response = await this.quotesAddOnsService.upsert(quote_id, addons)
		return response
	}
}
