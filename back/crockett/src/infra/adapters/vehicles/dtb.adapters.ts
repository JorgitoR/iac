import { Injectable, Inject } from '@nestjs/common'
import { IVehiclesRepository, Vehicle } from 'domain/vehicles'
import { PostgresAdapter, Vehicles as VehiclesDb } from 'infra/database'

@Injectable()
export class VehiclesDtb implements IVehiclesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Vehicle[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const vehicles = await db.model(VehiclesDb).findAll()
			const dataResult = vehicles.map((item) => item.dataValues as Vehicle)
			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Vehicle> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const vehicle = await db.model(VehiclesDb).findByPk(id)
			if (vehicle == null) {
				return Promise.resolve(null)
			}
			const dataResult = vehicle.toJSON() as Vehicle
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getByRego(rego: string): Promise<Vehicle> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const vehicle = await db.model(VehiclesDb).findOne({
				where: {
					rego: rego,
				},
			})
			if (vehicle == null) {
				return Promise.resolve(null)
			}
			const dataResult = vehicle.toJSON() as Vehicle
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(vehicle: Vehicle): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newVehicle = await db.model(VehiclesDb).create(vehicle as any)
			const dataResult = newVehicle.toJSON() as Vehicle
			return Promise.resolve({ created: true })
		} catch (error) {
			return Promise.resolve({ created: false })
		}
	}
	async update(id: number, vehicle: Vehicle): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const vehicleToUpdate = await db.model(VehiclesDb).findByPk(id)
			if (vehicleToUpdate == null) {
				return Promise.resolve({ updated: false })
			}
			await vehicleToUpdate.update(vehicle)
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
