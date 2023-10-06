import {
	Injectable,
	Inject,
	UnauthorizedException,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import { IVisitsService, IVisitsRepository, Visits } from 'domain/visits'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class VisitsService implements IVisitsService {
	constructor(
		@Inject('IVisitsRepository')
		private readonly visitsRepository: IVisitsRepository
	) {}
	async getAll(): Promise<ResponseModel<Visits[]>> {
		try {
			const visits = await this.visitsRepository.getAll()
			return {
				code: 200,
				data: visits,
				message: 'Visits retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getAllByJobID(job_id: number): Promise<ResponseModel<Visits[]>> {
		try {
			const visits = await this.visitsRepository.getAllByJobId(job_id)
			return {
				code: 200,
				data: visits,
				message: 'Visits retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getById(id: number): Promise<ResponseModel<Visits>> {
		try {
			const visit = await this.visitsRepository.getById(id)
			if (!visit) {
				throw new NotFoundException({
					code: 404,
					message: 'Visit not Found',
					data: null,
				})
			}
			return {
				code: 200,
				data: visit,
				message: 'Visit retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async create(visit: Visits): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const result = await this.visitsRepository.create({
				...visit,
				visit_status: 'Pending Prestart',
				status: 'Active',
			})
			return {
				code: 201,
				data: { created: result.created },
				message: 'Visit created successfully',
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
		visit: Visits
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const result = await this.visitsRepository.update(id, visit)
			return {
				code: 200,
				data: { updated: result.updated },
				message: 'Visit updated successfully',
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
