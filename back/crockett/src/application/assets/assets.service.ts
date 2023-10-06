import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { IAssetsService, Asset, IAssetsRepository } from 'domain/assets'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class AssetsService implements IAssetsService {
	constructor(
		@Inject('IAssetsRepository')
		private readonly assetsRepository: IAssetsRepository
	) {}
	async getAll(): Promise<ResponseModel<Asset[]>> {
		try {
			const assets = await this.assetsRepository.getAll()
			return Promise.resolve({ data: assets, code: 200, message: 'OK' })
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					code: 500,
					message: 'Internal Server Error',
					data: null,
				})
			)
		}
	}
	async getById(id: number): Promise<ResponseModel<Asset>> {
		try {
			const asset = await this.assetsRepository.getById(id)
			if (asset == null) {
				throw new NotFoundException('Asset not found')
			}
			return Promise.resolve({ data: asset, code: 200, message: 'OK' })
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					code: 500,
					message: 'Internal Server Error',
					data: null,
				})
			)
		}
	}
	async create(job: Asset): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const result = await this.assetsRepository.create(job)
			return {
				data: { created: result.created },
				code: 200,
				message: 'Created',
			}
		} catch (error) {
			new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async update(
		id: number,
		job: Asset
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const result = await this.assetsRepository.update(id, job)
			return {
				data: { updated: result.updated },
				code: 200,
				message: 'Updated',
			}
		} catch (error) {
			new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
}
