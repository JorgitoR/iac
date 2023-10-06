import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common'
import {
	IInvestigationReportService,
	IInvestigationReportRepository,
	InvestigationReport,
} from 'domain/investigation-report'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class InvestigationReportService implements IInvestigationReportService {
	constructor(
		@Inject('IInvestigationReportRepository')
		private readonly investigationReportRepository: IInvestigationReportRepository
	) {}
	async getAll(): Promise<ResponseModel<InvestigationReport[]>> {
		try {
			const handovers = await this.investigationReportRepository.getAll()
			return {
				code: 200,
				message: 'Investigation Report List',
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
	async getById(id: number): Promise<ResponseModel<InvestigationReport>> {
		try {
			const handover = await this.investigationReportRepository.getById(id)
			if (!handover) {
				throw new NotFoundException({
					code: 404,
					message: 'Investigation Report not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Investigation Report',
				data: handover,
			}
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error
			}
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
			})
		}
	}
	async getByJobId(
		job_id: number
	): Promise<ResponseModel<InvestigationReport>> {
		try {
			const handover = await this.investigationReportRepository.getByJobId(
				job_id
			)
			if (!handover) {
				throw new NotFoundException({
					code: 404,
					message: 'Investigation Report not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Investigation Report',
				data: handover,
			}
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error
			}
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
			})
		}
	}
	async create(
		report: InvestigationReport
	): Promise<ResponseModel<{ created: boolean; report: number }>> {
		try {
			const investigationReport =
				await this.investigationReportRepository.create(report)

			if (!investigationReport.created) {
				throw new InternalServerErrorException({
					code: 500,
					message: 'Investigation Report not created',
					data: null,
				})
			}

			return {
				code: 201,
				message: 'Investigation Report Created',
				data: {
					created: true,
					report: investigationReport.investigationReport_id,
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
		report: InvestigationReport
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const investigationReport =
				await this.investigationReportRepository.update(id, report)

			if (!investigationReport.updated) {
				throw new InternalServerErrorException({
					code: 500,
					message: 'Investigation Report not updated',
					data: null,
				})
			}

			return {
				code: 200,
				message: 'Investigation Report Updated',
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
