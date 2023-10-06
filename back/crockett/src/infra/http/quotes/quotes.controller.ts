import {
	Controller,
	Inject,
	Get,
	Post,
	Put,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IQuotesService } from 'domain/quotes/quote_general'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	IApproveQuotesService,
	IQuoteLinesService,
	IQuoteRatesService,
	IQuoteZonesService,
	IQuotesAddOnsService,
} from 'domain/quotes'
import { approveQuoteDTO, createQuoteDTO } from './dtos'

@ApiTags('Quotes')
@Controller('quotes')
export class QuoteGeneralController {
	constructor(
		@Inject('IQuotesService')
		private readonly quotesService: IQuotesService,
		@Inject('IApproveQuotesService')
		private readonly approveQuotesService: IApproveQuotesService,
		@Inject('IQuoteZonesService')
		private readonly quoteZonesService: IQuoteZonesService,
		@Inject('IQuoteRatesService')
		private readonly quoteRatesService: IQuoteRatesService,
		@Inject('IQuoteLinesService')
		private readonly quoteLinesService: IQuoteLinesService,
		@Inject('IQuotesAddOnsService')
		private readonly quotesAddOnsService: IQuotesAddOnsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all quotes' })
	@ApiResponse({
		status: 200,
		description: 'Quotes found',
	})
	@ApiResponse({
		status: 404,
		description: 'Quotes not found',
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
	async getAll() {
		const response = await this.quotesService.getAll()
		return response
	}

	@Get(':quote_id')
	@ApiOperation({ summary: 'Get a quote by id' })
	@ApiResponse({
		status: 200,
		description: 'Quote found',
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
	@HttpCode(200)
	async getOne(@Param('quote_id') quote_id: number) {
		const response = await this.quotesService.getById(quote_id)
		return response
	}

	@Post(':quote_id')
	@ApiOperation({ summary: 'Update a quote' })
	@ApiResponse({
		status: 200,
		description: 'Quote updated',
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
	@HttpCode(200)
	async update(@Param('quote_id') quote_id: number, @Body() quote: any) {
		const response = await this.quotesService.update(quote_id, quote)
		return response
	}

	@Put()
	@ApiOperation({ summary: 'Create a quote' })
	@ApiResponse({
		status: 200,
		description: 'Quote created',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote not created',
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
	async create(@Body() quote: createQuoteDTO) {
		const response = await this.quotesService.create({
			quote_type: quote.quote_type,
			job_type: quote.job_type,
			quote_num: null,
			street: quote.street,
			street2: quote.street2,
			city: quote.city,
			status: 'Pending',
			created_at: undefined,
			updated_at: undefined,
			max_zones: quote.max_zones,
			scope_of_work: quote.scope_of_work,
			postal: quote.postal,
			weekTotal: quote.weekTotal,
			total: quote.total,
			terms: quote.terms,
			client_contact: Number(quote.client_contact),
			estimator: Number(quote.estimator),
			approved_by: '',
			approveComment: '',
			variation_job_id: quote.variation_job_id || null,
			PO_Number: quote.PO_Number,
			estimatedWay: quote.estimatedWay,
			additionalTotal: quote.additionalTotal,
			erectDismantleTotal: quote.erectDismantleTotal,
			emailStatus: 'Ready to Send',
			longitude: quote.longitude,
			latitude: quote.latitude,
			fullAddress: quote.fullAddress,
			client: Number(quote.client),
		})
		const zones = await this.quoteZonesService.create(
			response.data.quote_id,
			quote.zones as any
		)
		const rates = await this.quoteRatesService.create(
			response.data.quote_id,
			quote.rates as any
		)
		const lines = await this.quoteLinesService.create(
			response.data.quote_id,
			quote.quote_lines as any
		)
		const addOns = await this.quotesAddOnsService.create(
			response.data.quote_id,
			quote.quote_additional_lines as any
		)
		return response
	}

	@Post(':id/sendQuoteEmail')
	@ApiOperation({ summary: 'Send a quote email' })
	@ApiResponse({
		status: 200,
		description: 'Quote email sent',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote email not sent',
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
	async sendQuoteEmail(@Param('id') id: number, @Body() body: any) {
		const response = await this.quotesService.markAsSent(id, body)
		return response
	}

	@Post(':id/markPendingEmail')
	@ApiOperation({ summary: 'Mark a quote as pending email' })
	@ApiResponse({
		status: 200,
		description: 'Quote marked as pending email',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote not marked as pending email',
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
	async markPendingEmail(@Param('id') id: number) {
		const response = await this.quotesService.markReadyToSent(id)
		return response
	}

	@Post(':id/approve')
	@ApiOperation({ summary: 'Approve a quote' })
	@ApiResponse({
		status: 200,
		description: 'Quote approved',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote not approved',
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
	async approve(@Param('id') id: number, @Body() body: approveQuoteDTO) {
		const response = await this.approveQuotesService.approveQuote(
			id,
			body.appovedBy,
			body.approveComment
		)
		return response
	}

	@Post(':id/decline')
	@ApiOperation({ summary: 'Decline a quote' })
	@ApiResponse({
		status: 200,
		description: 'Quote declined',
	})
	@ApiResponse({
		status: 404,
		description: 'Quote not declined',
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
	async decline(@Param('id') id: number, @Body() body: any) {
		const response = await this.quotesService.reject(id)
		return response
	}
}
