import {
	Injectable,
	Inject,
	UnauthorizedException,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import {
	IHandoverService,
	IHandOverRepository,
	HandOver,
} from 'domain/handover'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class HandOverService implements IHandoverService {
	constructor(
		@Inject('IHandOverRepository')
		private readonly handOverRepository: IHandOverRepository
	) {}
	async getAll(): Promise<ResponseModel<HandOver[]>> {
		try {
			const handovers = await this.handOverRepository.getAll()
			return {
				code: 200,
				message: 'HandOver List',
				data: handovers,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getById(id: number): Promise<ResponseModel<HandOver>> {
		try {
			const handover = await this.handOverRepository.getById(id)
			if (handover == null) {
				throw new NotFoundException({
					code: 404,
					message: 'HandOver not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'HandOver',
				data: handover,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getByJobId(job_id: number): Promise<ResponseModel<HandOver>> {
		const handover = await this.handOverRepository.getByJobId(job_id)
		if (handover == null) {
			throw new NotFoundException({
				code: 404,
				message: 'Handover not found',
				data: null,
			})
		}
		return {
			code: 200,
			message: 'HandOver',
			data: handover,
		}
	}
	async create(
		handover: HandOver
	): Promise<ResponseModel<{ created: boolean; handover: number }>> {
		try {
			const created = await this.handOverRepository.create(handover)
			return {
				code: 200,
				message: 'HandOver created',
				data: {
					created: true,
					handover: created.handover_id,
				},
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async update(
		id: number,
		handover: HandOver
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const handoverDB = await this.handOverRepository.getById(id)

			const updated = await this.handOverRepository.update(id, {
				...handoverDB,
				...handover,
			})

			const handoverUpdated = await this.handOverRepository.getById(id)

			const jobUpdated = await this.handOverRepository.updateJobStatus(
				handoverUpdated.job_id,
				'In Progress'
			)

			if (updated.updated == false) {
				throw new NotFoundException({
					code: 404,
					message: 'HandOver not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'HandOver updated',
				data: {
					updated: true,
				},
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
}
