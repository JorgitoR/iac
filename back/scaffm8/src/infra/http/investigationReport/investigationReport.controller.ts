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
import {
	IInvestigationReportService,
	InvestigationReport,
} from 'domain/investigation-report'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('Investigation Report')
@Controller('investigation-report')
export class InvestigationReportController {
	constructor(
		@Inject('IInvestigationReportService')
		private readonly investigationReportService: IInvestigationReportService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all Investigation Report' })
	@ApiResponse({
		status: 200,
		description: 'Investigation Report found',
	})
	@ApiResponse({
		status: 404,
		description: 'Investigations Reports not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAll(): Promise<ResponseModel<InvestigationReport[]>> {
		const result = await this.investigationReportService.getAll()
		return result
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get Investigation Report by id' })
	@ApiResponse({
		status: 200,
		description: 'Investigation Report found',
	})
	@ApiResponse({
		status: 404,
		description: 'Investigation Report not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getById(
		@Param('id') id: number
	): Promise<ResponseModel<InvestigationReport>> {
		const result = await this.investigationReportService.getById(id)
		return result
	}

	@Put()
	@ApiOperation({ summary: 'Investigation Report notes' })
	@ApiResponse({
		status: 200,
		description: 'Investigation Report created successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'Investigation Report not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async create(
		@Body() body: any
	): Promise<ResponseModel<{ created: boolean }>> {
		const result = await this.investigationReportService.create(body)
		return result
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update Investigation Report' })
	@ApiResponse({
		status: 200,
		description: 'Investigation Report updated successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'Investigation Report not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async update(
		@Param('id') id: number,
		@Body() body: any
	): Promise<ResponseModel<{ updated: boolean }>> {
		const result = await this.investigationReportService.update(id, body)
		return result
	}
}
