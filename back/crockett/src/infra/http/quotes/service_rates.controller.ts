import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IServiceRatesService } from 'domain/quotes/service_rates'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Quotes')
@Controller('service_rates')
export class ServiceRatesController {
	constructor(
		@Inject('IServiceRatesService')
		private readonly serviceRatesService: IServiceRatesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all service rates' })
	@ApiResponse({
		status: 200,
		description: 'Service rates found',
	})
	@ApiResponse({
		status: 404,
		description: 'Service rates not found',
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
		const response = await this.serviceRatesService.getAll()
		return response
	}

	@Post()
	@ApiOperation({ summary: 'Update the service rates' })
	@ApiResponse({
		status: 200,
		description: 'Service rates updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Service rates not found',
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
	async update(@Body() body: any) {
		const response = await this.serviceRatesService.update(body)
		return response
	}
}
