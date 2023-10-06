import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { INotesService, Notes, INotesRepository } from '../../domain/notes'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class NotesService implements INotesService {
	constructor(
		@Inject('INotesRepository')
		private readonly NotesRepository: INotesRepository
	) {}
	async getAll(): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAll()
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyAssetId(id: number): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAllbyAssetId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyClientsId(id: number): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAllbyClientsId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyJobId(id: number): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAllbyJobId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyVisitId(id: number): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAllbyVisitId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyVehicleId(id: number): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAllbyVehicleId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyTagId(id: number): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAllbyTagId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyStaffId(id: number): Promise<ResponseModel<Notes[]>> {
		try {
			const result = await this.NotesRepository.getAllbyStaffId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getById(id: number): Promise<ResponseModel<Notes>> {
		try {
			const result = await this.NotesRepository.getById(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'Notes not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async create(asset: Notes): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const result = await this.NotesRepository.create(asset)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'Notes not created',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes created',
				data: { created: true },
				code: 201,
			})
		} catch (error) {
			return Promise.reject(
				new UnauthorizedException({
					message: 'Unauthorized',
					data: null,
					code: 401,
				})
			)
		}
	}
	async update(
		id: number,
		asset: Notes
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const result = await this.NotesRepository.update(id, asset)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'Notes not updated',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes updated',
				data: { updated: true },
				code: 201,
			})
		} catch (error) {
			return Promise.reject(
				new UnauthorizedException({
					message: 'Unauthorized',
					data: null,
					code: 401,
				})
			)
		}
	}

	async delete(id: number): Promise<ResponseModel<{ deleted: boolean }>> {
		try {
			const result = await this.NotesRepository.delete(id)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'Notes not deleted',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'Notes deleted',
				data: { deleted: true },
				code: 201,
			})
		} catch (error) {
			return Promise.reject(
				new UnauthorizedException({
					message: 'Unauthorized',
					data: null,
					code: 401,
				})
			)
		}
	}
}
