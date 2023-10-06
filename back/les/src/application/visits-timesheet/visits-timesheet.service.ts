import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import {
	IVisitsTimesheetsService,
	IVisitsTimesheetRepository,
	VisitTimesheet,
} from 'domain/visits-timesheets'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class VisitsTimesheetService implements IVisitsTimesheetsService {
	constructor(
		@Inject('IVisitsTimesheetRepository')
		private readonly visitsTimesheetRepository: IVisitsTimesheetRepository
	) {}
	async getAllByJobID(
		job_id: number
	): Promise<ResponseModel<VisitTimesheet[]>> {
		try {
			const timesheets = await this.visitsTimesheetRepository.getAllByJobId(
				job_id
			)
			return {
				code: 200,
				data: timesheets,
				message: 'Visits Timesheets retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getById(id: number): Promise<ResponseModel<VisitTimesheet>> {
		try {
			const timesheet = await this.visitsTimesheetRepository.getById(id)
			if (!timesheet) {
				throw new NotFoundException({
					code: 404,
					message: 'Visit Timesheet not Found',
					data: null,
				})
			}
			return {
				code: 200,
				data: timesheet,
				message: 'Visit Timesheet retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async create(
		job_id: number,
		visitTimesheet: VisitTimesheet
	): Promise<ResponseModel<{ created: boolean; id: number }>> {
		const visit = await this.visitsTimesheetRepository.create({
			...visitTimesheet,
			job_id,
		})
		if (!visit) {
			throw new ConflictException({
				code: 409,
				message: 'Visit Timesheet not created',
				data: null,
			})
		}
		return {
			code: 201,
			data: { created: true, id: visit.id },
		}
	}
	update(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		id: number,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		visitTimesheet: VisitTimesheet
	): Promise<ResponseModel<{ updated: boolean }>> {
		throw new Error('Method not implemented.')
	}
}
