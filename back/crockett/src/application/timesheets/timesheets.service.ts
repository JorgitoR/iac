import {
	Injectable,
	Inject,
	UnauthorizedException,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import {
	ITimesheetsService,
	ITimesheetsRepository,
	Timesheet,
} from 'domain/timsheets'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class TimesheetsService implements ITimesheetsService {
	constructor(
		@Inject('ITimesheetsRepository')
		private readonly timesheetsRepository: ITimesheetsRepository
	) {}
	async getAll(): Promise<ResponseModel<Timesheet[]>> {
		try {
			const timesheets = await this.timesheetsRepository.getAll()
			return {
				code: 200,
				data: timesheets,
				message: 'Timesheets retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Internal server error',
			})
		}
	}
	async getById(id: number): Promise<ResponseModel<Timesheet>> {
		try {
			const timesheet = await this.timesheetsRepository.getAllById(id)
			if (timesheet == null) {
				throw new NotFoundException({
					code: 404,
					data: null,
					message: 'Timesheet not found',
				})
			}
			return {
				code: 200,
				data: timesheet,
				message: 'Timesheet retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Internal server error',
			})
		}
	}
	async getAllByJobId(job_id: number): Promise<ResponseModel<Timesheet[]>> {
		try {
			const timesheets = await this.timesheetsRepository.getAllByJobId(job_id)
			return {
				code: 200,
				data: timesheets,
				message: 'Timesheets retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Internal server error',
			})
		}
	}
	async getAllByStaffId(staff_id: number): Promise<ResponseModel<Timesheet[]>> {
		try {
			const timesheets = await this.timesheetsRepository.getAllByStaffId(
				staff_id
			)
			return {
				code: 200,
				data: timesheets,
				message: 'Timesheets retrieved successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Internal server error',
			})
		}
	}
	async create(
		timesheet: Timesheet
	): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const timesheetCreated = await this.timesheetsRepository.create(timesheet)
			if (timesheetCreated == null) {
				throw new ConflictException({
					code: 409,
					data: null,
					message: 'Timesheet already exists',
				})
			}
			return {
				code: 201,
				data: { created: true },
				message: 'Timesheet created successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Internal server error',
			})
		}
	}
	async update(
		id: number,
		timesheet: Timesheet
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const timesheetUpdated = await this.timesheetsRepository.update(
				id,
				timesheet
			)
			if (timesheetUpdated == null) {
				throw new NotFoundException({
					code: 404,
					data: null,
					message: 'Timesheet not found',
				})
			}
			return {
				code: 200,
				data: { updated: true },
				message: 'Timesheet updated successfully',
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Internal server error',
			})
		}
	}
}
