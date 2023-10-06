import { Client } from './Client'

export interface IClientsRepository {
	getAll(): Promise<Client[]>
	getById(id: number): Promise<Client>
	create(user: Client): Promise<{ created: boolean; id: number }>
	update(id: number, staff: Client): Promise<{ updated: boolean }>
	validateClientEmail(email: string): Promise<boolean>
}
