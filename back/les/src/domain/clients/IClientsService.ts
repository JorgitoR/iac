import { Client } from './Client'
import { ResponseModel } from '../responseModel'

export interface IClientsService {
	getAll(): Promise<ResponseModel<Client[]>>
	getById(id: number): Promise<ResponseModel<Client>>
	create(user: Client): Promise<ResponseModel<{ created: boolean; id: number }>>
	update(
		id: number,
		staff: Client
	): Promise<ResponseModel<{ updated: boolean }>>
}
