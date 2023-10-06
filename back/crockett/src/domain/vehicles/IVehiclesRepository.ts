import { Vehicle } from './Vehicles'

export interface IVehiclesRepository {
	getAll(): Promise<Vehicle[]>
	getById(id: number): Promise<Vehicle>
	getByRego(rego: string): Promise<Vehicle>
	create(vehicle: Vehicle): Promise<{ created: boolean }>
	update(id: number, vehicle: Vehicle): Promise<{ updated: boolean }>
}
