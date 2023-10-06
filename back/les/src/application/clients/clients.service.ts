import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { IAppenateService } from 'domain/appenate'
import { IClientsService, Client, IClientsRepository } from 'domain/clients'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class ClientsService implements IClientsService {
	constructor(
		@Inject('IClientsRepository')
		private readonly clientsRepository: IClientsRepository,
		@Inject('IAppenateService')
		private readonly appenateService: IAppenateService
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
		await this.appenateService.updateClientsTable({ id: client.id, ...user })
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
		await this.appenateService.updateClientsTable({ id, ...staff })
		return {
			code: 200,
			data: { updated: true },
			message: 'Client updated',
		}
	}
}
