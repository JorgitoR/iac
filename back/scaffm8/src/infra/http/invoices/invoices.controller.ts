import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	Put,
	HttpCode,
	Param,
	Delete,
} from '@nestjs/common'
import { IInvoicesService, WeeklyHire, Edinvoice } from 'domain/invoices'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
	constructor(
		@Inject('IInvoicesService')
		private readonly invoicesService: IInvoicesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all invoices' })
	@ApiResponse({
		status: 200,
		description: 'Invoices found',
	})
	@ApiResponse({
		status: 404,
		description: 'Invoices not found',
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
		const response = await this.invoicesService.getAll()
		return response
	}

	@Get('/weeklyHire/job/:job_id')
	@ApiOperation({ summary: 'Get all weekly hire invoices' })
	@ApiResponse({
		status: 200,
		description: 'Weekly hire invoices found',
	})
	@ApiResponse({
		status: 404,
		description: 'Weekly hire invoices not found',
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
	async getWeeklyHire(@Param('job_id') job_id: number) {
		const response = await this.invoicesService.getAllWeeklyHireByJobID(job_id)
		return response
	}

	@Get('/edinvoice/job/:job_id')
	@ApiOperation({ summary: 'Get all edinvoice invoices' })
	@ApiResponse({
		status: 200,
		description: 'Edinvoice invoices found',
	})
	@ApiResponse({
		status: 404,
		description: 'Edinvoice invoices not found',
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
	async getEdinvoice(@Param('job_id') job_id: number) {
		const response = await this.invoicesService.getAllEdinvoiceByJobID(job_id)
		return response
	}

	@Get('/weeklyHire/:id')
	@ApiOperation({ summary: 'Get weekly hire invoice' })
	@ApiResponse({
		status: 200,
		description: 'Weekly hire invoice found',
	})
	@ApiResponse({
		status: 404,
		description: 'Weekly hire invoice not found',
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
	async getWeeklyHireByID(@Param('id') id: number) {
		const response = await this.invoicesService.getWeeklyHireById(id)
		return response
	}

	@Get('/edinvoice/:id')
	@ApiOperation({ summary: 'Get edinvoice invoice' })
	@ApiResponse({
		status: 200,
		description: 'Edinvoice invoice found',
	})
	@ApiResponse({
		status: 404,
		description: 'Edinvoice invoice not found',
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
	async getEdinvoiceByID(@Param('id') id: number) {
		const response = await this.invoicesService.getEdinvoiceById(id)
		return response
	}

	@Post('/weeklyHire/:id')
	@ApiOperation({ summary: 'Update weekly hire invoice' })
	@ApiResponse({
		status: 200,
		description: 'Weekly hire invoice updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Weekly hire invoice not found',
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
	async updateWeeklyHire(@Param('id') id: number, @Body() weeklyHire: any) {
		const response = await this.invoicesService.updateWeeklyHire(id, weeklyHire)
		return response
	}

	@Post('/edinvoice/:id')
	@ApiOperation({ summary: 'Update edinvoice invoice' })
	@ApiResponse({
		status: 200,
		description: 'Edinvoice invoice updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Edinvoice invoice not found',
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
	async updateEdinvoice(@Param('id') id: number, @Body() edinvoice: any) {
		const response = await this.invoicesService.updateEdinvoice(id, edinvoice)
		return response
	}

	@Put('/weeklyHire/job/:job_id')
	@ApiOperation({ summary: 'Create weekly hire invoice' })
	@ApiResponse({
		status: 200,
		description: 'Weekly hire invoice created',
	})
	@ApiResponse({
		status: 404,
		description: 'Weekly hire invoice not created',
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
	async createWeeklyHire(
		@Param('job_id') job_id: number,
		@Body() weeklyHire: any
	) {
		const response = await this.invoicesService.createWeeklyHire(
			job_id,
			weeklyHire
		)
		return response
	}

	@Put('/edinvoice/job/:job_id')
	@ApiOperation({ summary: 'Create edinvoice invoice' })
	@ApiResponse({
		status: 200,
		description: 'Edinvoice invoice created',
	})
	@ApiResponse({
		status: 404,
		description: 'Edinvoice invoice not created',
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
	async createEdinvoice(
		@Param('job_id') job_id: number,
		@Body() edinvoice: any
	) {
		const response = await this.invoicesService.createEdinvoice(
			job_id,
			edinvoice
		)
		return response
	}

	@Delete('/weeklyHire/:id')
	@ApiOperation({ summary: 'Delete weekly hire invoice' })
	@ApiResponse({
		status: 200,
		description: 'Weekly hire invoice deleted',
	})
	@ApiResponse({
		status: 404,
		description: 'Weekly hire invoice not found',
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
	async deleteWeeklyHire(@Param('id') id: number) {
		const response = await this.invoicesService.deleteWeeklyHire(id)
		return response
	}

	@Delete('/edinvoice/:id')
	@ApiOperation({ summary: 'Delete edinvoice invoice' })
	@ApiResponse({
		status: 200,
		description: 'Edinvoice invoice deleted',
	})
	@ApiResponse({
		status: 404,
		description: 'Edinvoice invoice not found',
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
	async deleteEdinvoice(@Param('id') id: number) {
		const response = await this.invoicesService.deleteEdinvoice(id)
		return response
	}

	@Post('/approve')
	@ApiOperation({ summary: 'Approve invoices' })
	@ApiResponse({
		status: 200,
		description: 'Invoices approved',
	})
	@ApiResponse({
		status: 404,
		description: 'Invoices not approved',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async approveInvoices(@Body() body: any) {
		const { invoices, dateCompleted, endOfMonth } = body

		const response = await this.invoicesService.approveInvoices(
			invoices,
			dateCompleted,
			endOfMonth
		)
		return response
	}
}
