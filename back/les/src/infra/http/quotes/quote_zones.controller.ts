import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IQuoteZonesService } from 'domain/quotes/quote_zones'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Quotes')
@Controller('quotes/:quote_id/zones')
export class QuoteZonesController {
	constructor(
		@Inject('IQuoteZonesService')
		private readonly quoteZonesService: IQuoteZonesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all Zones of a quote' })
	@ApiResponse({
		status: 200,
		description: 'Zones found',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote Zones not found',
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
		const response = await this.quoteZonesService.getAllbyQuoteID(quote_id)
		return response
	}

	@Post()
	@ApiOperation({ summary: 'Update Zones of the quote' })
	@ApiResponse({
		status: 200,
		description: 'Zones updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote not found',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	async updateZones(@Param('quote_id') quote_id: number, @Body() zones: any) {
		const response = await this.quoteZonesService.update(quote_id, zones)
		return response
	}
}
