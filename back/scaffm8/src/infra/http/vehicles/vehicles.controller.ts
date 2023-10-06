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
import { IVehiclesService, Vehicle } from 'domain/vehicles'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
	constructor(
		@Inject('IVehiclesService')
		private readonly vehiclesService: IVehiclesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all vehicles' })
	@ApiResponse({
		status: 200,
		description: 'Vehicles found',
	})
	@ApiResponse({
		status: 404,
		description: 'Vehicles not found',
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
	async getAll(): Promise<ResponseModel<Vehicle[]>> {
		const response = await this.vehiclesService.getAll()
		return response
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get vehicle by id' })
	@ApiResponse({
		status: 200,
		description: 'Vehicle found',
	})
	@ApiResponse({
		status: 404,
		description: 'Vehicle not found',
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
	async getById(@Param('id') id: number): Promise<ResponseModel<Vehicle>> {
		const response = await this.vehiclesService.getById(id)
		return response
	}

	@Put()
	@ApiOperation({ summary: 'Create vehicle' })
	@ApiResponse({
		status: 200,
		description: 'Vehicle created',
	})
	@ApiResponse({
		status: 404,
		description: 'Vehicle not found',
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
	async create(@Body() vehicle: any): Promise<
		ResponseModel<{
			created: boolean
		}>
	> {
		const response = await this.vehiclesService.create(vehicle)
		return response
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update vehicle' })
	@ApiResponse({
		status: 200,
		description: 'Vehicle updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Vehicle not found',
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
	async update(
		@Param('id') id: number,
		@Body() vehicle: any
	): Promise<
		ResponseModel<{
			updated: boolean
		}>
	> {
		const response = await this.vehiclesService.update(id, vehicle)
		return response
	}
}
