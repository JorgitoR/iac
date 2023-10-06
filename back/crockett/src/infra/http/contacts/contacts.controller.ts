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
import { IContactsService, Contact } from 'domain/contacts'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'
import { createContactDTO, updateContactDTO } from './contacts.dto'

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
	constructor(
		@Inject('IContactsService')
		private readonly contactsService: IContactsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all contacts' })
	@ApiResponse({
		status: 200,
		description: 'The contacts were obtained successfully.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async getAll(): Promise<ResponseModel<Contact[]>> {
		const contacts = await this.contactsService.getAll()
		return contacts
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get contact by id' })
	@ApiResponse({
		status: 200,
		description: 'The contact was obtained successfully.',
	})
	@ApiResponse({
		status: 404,
		description: 'Contact not found.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async getById(@Param('id') id: number): Promise<ResponseModel<Contact>> {
		const client = await this.contactsService.getById(id)
		return client
	}

	@Post(':id')
	@HttpCode(200)
	@ApiOperation({ summary: 'Update contact' })
	@ApiResponse({
		status: 200,
		description: 'The contact was updated successfully.',
	})
	@ApiResponse({
		status: 404,
		description: 'Contact not found.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async update(
		@Param('id') id: number,
		@Body() contact: updateContactDTO
	): Promise<ResponseModel<{ updated: boolean }>> {
		const updatedContact = await this.contactsService.update(id, contact as any)
		return updatedContact
	}

	@Put()
	@HttpCode(200)
	@ApiOperation({ summary: 'Create contact' })
	@ApiResponse({
		status: 200,
		description: 'The contact was created successfully.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async create(
		@Body() contact: createContactDTO
	): Promise<ResponseModel<{ created: boolean }>> {
		const createdContact = await this.contactsService.create(contact as Contact)
		return createdContact
	}
}
