import { Vehicle } from './Vehicles'
import { ResponseModel } from '../responseModel'

export interface IVehiclesService {
	getAll(): Promise<ResponseModel<Vehicle[]>>
	getById(id: number): Promise<ResponseModel<Vehicle>>
	getByRego(rego: string): Promise<ResponseModel<Vehicle>>
	create(vehicle: Vehicle): Promise<ResponseModel<{ created: boolean }>>
	update(
		id: number,
		vehicle: Vehicle
	): Promise<ResponseModel<{ updated: boolean }>>
}
