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

@ApiTags('Contacts')
@Controller('clients/:client_id/contacts')
export class ClientsContactsController {
	constructor(
		@Inject('IContactsService')
		private readonly contactsService: IContactsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get contacts by client id' })
	@ApiResponse({
		status: 200,
		description: 'All contacts of the client were obtained successfully.',
	})
	@ApiResponse({
		status: 404,
		description: 'Client not found.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async getByClientId(
		@Param('client_id') id: number
	): Promise<ResponseModel<Contact[]>> {
		const client = await this.contactsService.getAllByClientId(id)
		return client
	}
}
