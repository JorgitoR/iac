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
import { IClientsService, Client } from 'domain/clients'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'
import { createClientDTO, updateClientDTO } from './clients.dto'

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
	constructor(
		@Inject('IClientsService') private readonly clientsService: IClientsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all clients' })
	@ApiResponse({
		status: 200,
		description: 'All the clients were obtained successfully.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async getAll(): Promise<ResponseModel<Client[]>> {
		const clients = await this.clientsService.getAll()
		return clients
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get client by id' })
	@ApiResponse({
		status: 200,
		description: 'The client was obtained successfully.',
	})
	@ApiResponse({
		status: 404,
		description: 'Client not found.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async getById(@Param('id') id: number): Promise<ResponseModel<Client>> {
		const client = await this.clientsService.getById(id)
		return client
	}

	@Post(':id')
	@HttpCode(200)
	@ApiOperation({ summary: 'Update client' })
	@ApiResponse({
		status: 200,
		description: 'The client was updated successfully.',
	})
	@ApiResponse({
		status: 404,
		description: 'Client not found.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async Update(
		@Param('id') id: number,
		@Body() client: updateClientDTO
	): Promise<ResponseModel<{ updated: boolean }>> {
		const response = await this.clientsService.update(id, client as any)
		return response
	}

	@Put()
	@HttpCode(200)
	@ApiOperation({ summary: 'Create client' })
	@ApiResponse({
		status: 400,
		description: 'Bad request.',
	})
	@ApiResponse({
		status: 200,
		description: 'The client was created successfully.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async create(
		@Body() client: createClientDTO
	): Promise<ResponseModel<{ created: boolean; id: number }>> {
		const response = await this.clientsService.create(client as Client)
		return response
	}
}
