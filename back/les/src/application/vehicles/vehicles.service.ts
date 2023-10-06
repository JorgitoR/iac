import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import { IVehiclesService, IVehiclesRepository, Vehicle } from 'domain/vehicles'
import { ResponseModel } from 'domain/responseModel'
import { IAppenateService } from 'domain/appenate/IAppenateService'

@Injectable()
export class VehiclesService implements IVehiclesService {
	constructor(
		@Inject('IVehiclesRepository')
		private readonly vehiclesRepository: IVehiclesRepository,
		@Inject('IAppenateService')
		private readonly appenateService: IAppenateService
	) {}
	async getAll(): Promise<ResponseModel<Vehicle[]>> {
		try {
			const vehicles = await this.vehiclesRepository.getAll()
			return {
				code: 200,
				message: 'Vehicles found',
				data: vehicles,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async getById(id: number): Promise<ResponseModel<Vehicle>> {
		try {
			const vehicle = await this.vehiclesRepository.getById(id)
			if (!vehicle) {
				throw new NotFoundException({
					code: 404,
					message: 'Vehicle not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Vehicle found',
				data: vehicle,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async getByRego(rego: string): Promise<ResponseModel<Vehicle>> {
		try {
			const vehicle = await this.vehiclesRepository.getByRego(rego)
			if (!vehicle) {
				throw new NotFoundException({
					code: 404,
					message: 'Vehicle not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Vehicle found',
				data: vehicle,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async create(vehicle: Vehicle): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const resultVehicle = await this.vehiclesRepository.create(vehicle)
			if (!resultVehicle.created) {
				throw new ConflictException({
					code: 500,
					message: 'Vehicle not created',
					data: null,
				})
			}
			await this.appenateService.updateVehiclesTable({
				id: resultVehicle.id,
				...vehicle,
			})
			return {
				code: 201,
				message: 'Vehicle created',
				data: { created: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async update(
		id: number,
		vehicle: Vehicle
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const vehicleExists = await this.vehiclesRepository.getById(id)
			const resultVehicle = await this.vehiclesRepository.update(id, {
				...vehicleExists,
				...vehicle,
			})

			if (!resultVehicle.updated) {
				throw new ConflictException({
					code: 500,
					message: 'Vehicle not updated',
					data: null,
				})
			}

			await this.appenateService.updateVehiclesTable({
				id,
				...vehicle,
			})

			return {
				code: 200,
				message: 'Vehicle updated',
				data: { updated: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
}
