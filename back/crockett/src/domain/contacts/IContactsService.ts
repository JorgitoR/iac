import { Contact } from './Contacts'
import { ResponseModel } from '../responseModel'

export interface IContactsService {
	getAll(): Promise<ResponseModel<Contact[]>>
	getAllByClientId(id: number): Promise<ResponseModel<Contact[]>>
	getById(id: number): Promise<ResponseModel<Contact>>
	create(contact: Contact): Promise<ResponseModel<{ created: boolean }>>
	update(
		id: number,
		staff: Contact
	): Promise<ResponseModel<{ updated: boolean }>>
}
