import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { IClientsService, Client, IClientsRepository } from 'domain/clients'
import { ResponseModel } from 'domain/responseModel'
import { IAuthService } from 'domain/auth'

@Injectable()
export class ClientsService implements IClientsService {
	constructor(
		@Inject('IClientsRepository')
		private readonly clientsRepository: IClientsRepository
	) {}
	async getAll(): Promise<ResponseModel<Client[]>> {
		const clients = await this.clientsRepository.getAll()
		return {
			code: 200,
			data: clients,
			message: 'Clients list',
		}
	}
	async getById(id: number): Promise<ResponseModel<Client>> {
		const client = await this.clientsRepository.getById(id)
		if (client == null) {
			throw new NotFoundException('Client not found')
		}
		return {
			code: 200,
			data: client,
			message: 'Client found',
		}
	}
	async create(
		user: Client
	): Promise<ResponseModel<{ created: boolean; id: number }>> {
		const client = await this.clientsRepository.create(user)
		if (client == null) {
			throw new ConflictException('Client not created')
		}
		return {
			code: 200,
			data: { created: true, id: client.id },
			message: 'Client created',
		}
	}
	async update(
		id: number,
		staff: Client
	): Promise<ResponseModel<{ updated: boolean }>> {
		const client = await this.clientsRepository.update(id, staff)
		if (client == null) {
			throw new ConflictException('Client not updated')
		}
		return {
			code: 200,
			data: { updated: true },
			message: 'Client updated',
		}
	}
}
