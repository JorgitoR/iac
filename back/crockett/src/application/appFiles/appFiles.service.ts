import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { IAppFilesService, AppFile, IAppFilesRepository } from 'domain/appFiles'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class AppFilesService implements IAppFilesService {
	constructor(
		@Inject('IAppFilesRepository')
		private readonly appFilesRepository: IAppFilesRepository
	) {}
	async getAll(): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAll()
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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
	async getAllbyAssetId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyAssetId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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

	async getAllbyClientsId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyClientsId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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
	async getAllbyJobId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyJobId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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
	async getAllbyVisitId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyVisitId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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
	async getAllbyVehicleId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyVehicleId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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
	async getAllbyTagId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyTagId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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

	async getAllbyStaffId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyStaffId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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

	async getById(id: number): Promise<ResponseModel<AppFile>> {
		try {
			const result = await this.appFilesRepository.getById(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
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
	async create(asset: AppFile): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const result = await this.appFilesRepository.create(asset)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'AppFiles not created',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles created',
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
		asset: AppFile
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const result = await this.appFilesRepository.update(id, asset)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'AppFiles not updated',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles updated',
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
	async delete(
		id: number
	): Promise<ResponseModel<{ deleted: boolean }>> {
		try {
			const result = await this.appFilesRepository.delete(id)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'AppFiles not deleted',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles deleted',
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
