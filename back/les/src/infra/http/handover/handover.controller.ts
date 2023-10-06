import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IHandoverService, HandOver } from 'domain/handover'
import { ResponseModel } from 'domain/responseModel'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateHandoverDto } from './dtos/updateHandover.dto'

@ApiTags('Jobs')
@Controller('jobs/:job_id/handover')
export class HandoverController {
	constructor(
		@Inject('IHandoverService')
		private readonly handoverService: IHandoverService
	) {}

	@Get(':id')
	@ApiOperation({ summary: 'Get a handover by id' })
	@ApiResponse({
		status: 200,
		description: 'Handover found',
	})
	@ApiResponse({
		status: 404,
		description: 'Handover not found',
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
	async getById(id: number): Promise<ResponseModel<HandOver>> {
		const response = await this.handoverService.getById(id)
		return response
	}

	@Get('')
	@ApiOperation({ summary: 'Get a handover by job_id' })
	@ApiResponse({
		status: 200,
		description: 'Handover found',
	})
	@ApiResponse({
		status: 404,
		description: 'Handover not found',
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
	async getByJobId(
		@Param('job_id')
		job_id: number
	): Promise<ResponseModel<HandOver>> {
		const response = await this.handoverService.getByJobId(job_id)
		return response
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update the handover' })
	@ApiResponse({
		status: 200,
		description: 'Handover updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Handover not found',
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
	async update(@Param('id') id: number, @Body() handover: UpdateHandoverDto) {
		const response = await this.handoverService.update(id, handover as HandOver)
		return response
	}
}
