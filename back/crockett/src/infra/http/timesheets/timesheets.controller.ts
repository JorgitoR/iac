import {
	Controller,
	Inject,
	Get,
	Post,
	Put,
	Body,
	HttpCode,
	Param,
	Delete,
} from '@nestjs/common'
import { ITimesheetsService, Timesheet } from 'domain/timsheets'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('Timesheets')
@Controller('timesheets')
export class TimesheetsController {
	constructor(
		@Inject('ITimesheetsService')
		private readonly timesheetsService: ITimesheetsService
	) {}

	@Get('/all')
	@ApiOperation({ summary: 'Get all timesheets' })
	@ApiResponse({ status: 200, description: 'Get all timesheets' })
	async getAll(): Promise<ResponseModel<Timesheet[]>> {
		const response = await this.timesheetsService.getAll()
		return response
	}

	@Get('/job/:job_id')
	@ApiOperation({ summary: 'Get all timesheets by job id' })
	@ApiResponse({ status: 200, description: 'Get all timesheets by job id' })
	async getAllByJobId(
		@Param('job_id') job_id: number
	): Promise<ResponseModel<Timesheet[]>> {
		const response = await this.timesheetsService.getAllByJobId(job_id)
		return response
	}

	@Get('/staff/:staff_id')
	@ApiOperation({ summary: 'Get all timesheets by staff id' })
	@ApiResponse({ status: 200, description: 'Get all timesheets by staff id' })
	async getAllByStaffId(
		@Param('staff_id') staff_id: number
	): Promise<ResponseModel<Timesheet[]>> {
		const response = await this.timesheetsService.getAllByStaffId(staff_id)
		return response
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Get timesheet by id' })
	@ApiResponse({ status: 200, description: 'Get timesheet by id' })
	async getById(@Param('id') id: number): Promise<ResponseModel<Timesheet>> {
		const response = await this.timesheetsService.getById(id)
		return response
	}

	@Put()
	@ApiOperation({ summary: 'Create timesheet' })
	@ApiResponse({ status: 200, description: 'Create timesheet' })
	async create(
		@Body() timesheet: Timesheet
	): Promise<ResponseModel<{ created: boolean }>> {
		const response = await this.timesheetsService.create(timesheet)
		return response
	}

	@Post(':/id')
	@ApiOperation({ summary: 'Update timesheet' })
	@ApiResponse({ status: 200, description: 'Update timesheet' })
	async update(
		@Param('id') id: number,
		@Body() timesheet: Timesheet
	): Promise<ResponseModel<{ updated: boolean }>> {
		const response = await this.timesheetsService.update(id, timesheet)
		return response
	}
}
