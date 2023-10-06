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
import { IVisitsService, Visits } from 'domain/visits'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('Vists')
@Controller('visits')
export class VisitsController {
	constructor(
		@Inject('IVisitsService')
		private readonly visitsService: IVisitsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all visits' })
	@ApiResponse({
		status: 200,
		description: 'Visits found',
	})
	@ApiResponse({
		status: 404,
		description: 'Visits not found',
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
	async getAll(): Promise<ResponseModel<Visits[]>> {
		const response = await this.visitsService.getAll()
		return response
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get visit by id' })
	@ApiResponse({
		status: 200,
		description: 'Visit found',
	})
	@ApiResponse({
		status: 404,
		description: 'Visit not found',
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
	async getById(@Param('id') id: number): Promise<ResponseModel<Visits>> {
		const response = await this.visitsService.getById(id)
		return response
	}

	@Get('job/:id')
	@ApiOperation({ summary: 'Get visit by job id' })
	@ApiResponse({
		status: 200,
		description: 'Visit found',
	})
	@ApiResponse({
		status: 404,
		description: 'Visit not found',
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
	async getAllByJobId(
		@Param('id') id: number
	): Promise<ResponseModel<Visits[]>> {
		const response = await this.visitsService.getAllByJobID(id)
		return response
	}

	@Post(':id')
	@ApiOperation({ summary: 'update visit by id' })
	@ApiResponse({
		status: 200,
		description: 'Visit updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Visit not found',
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
	async updateById(
		@Param('id') id: number,
		@Body() visit: any
	): Promise<ResponseModel<{ updated: boolean }>> {
		const response = await this.visitsService.update(id, visit)
		return response
	}

	@Put()
	@ApiOperation({ summary: 'Create visit' })
	@ApiResponse({
		status: 200,
		description: 'Visit created',
	})
	@ApiResponse({
		status: 404,
		description: 'Visit not created',
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
	async create(@Body() visit: any): Promise<
		ResponseModel<{
			created: boolean
		}>
	> {
		const response = await this.visitsService.create(visit)
		return response
	}
}
