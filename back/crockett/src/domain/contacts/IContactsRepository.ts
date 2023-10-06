import { Contact } from './Contacts'

export interface IContactsRepository {
	getAll(): Promise<Contact[]>
	getById(id: number): Promise<Contact>
	getAllByClientId(client_id: number): Promise<Contact[]>
	create(contact: Contact): Promise<{ created: boolean }>
	update(id: number, staff: Contact): Promise<{ updated: boolean }>
}
