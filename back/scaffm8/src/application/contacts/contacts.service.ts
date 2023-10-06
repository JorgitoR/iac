import {
	Injectable,
	Inject,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { IContactsService, Contact, IContactsRepository } from 'domain/contacts'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class ContactsService implements IContactsService {
	constructor(
		@Inject('IContactsRepository')
		private readonly contactsRepository: IContactsRepository
	) {}
	async getAll(): Promise<ResponseModel<Contact[]>> {
		const contacts = await this.contactsRepository.getAll()
		return {
			code: 200,
			data: contacts,
			message: 'Contacts list',
		}
	}
	async getAllByClientId(id: number): Promise<ResponseModel<Contact[]>> {
		const contacts = await this.contactsRepository.getAllByClientId(id)
		return {
			code: 200,
			data: contacts,
			message: 'Contacts list',
		}
	}
	async getById(id: number): Promise<ResponseModel<Contact>> {
		const contact = await this.contactsRepository.getById(id)
		if (contact == null) {
			throw new NotFoundException('Contact not found')
		}
		return {
			code: 200,
			data: contact,
			message: 'Client found',
		}
	}
	async create(contact: Contact): Promise<ResponseModel<{ created: boolean }>> {
		const newContact = await this.contactsRepository.create(contact)
		if (newContact == null || !newContact.created) {
			throw new ConflictException({
				code: 409,
				message: 'Contact not created',
				data: { created: false },
			})
		}

		try {
			const client = await this.contactsRepository.getById(newContact.id)
		} catch (error) {
			throw new ConflictException({
				code: 409,
				message: 'Contact not created',
				data: { created: false },
			})
		}
		return {
			code: 200,
			data: { created: true },
			message: 'Contact created',
		}
	}
	async update(
		id: number,
		contact: Contact
	): Promise<ResponseModel<{ updated: boolean }>> {
		const client = await this.contactsRepository.update(id, contact)
		if (client == null) {
			throw new ConflictException('Contact not updated')
		}
		return {
			code: 200,
			data: { updated: true },
			message: 'Contact updated',
		}
	}
}
