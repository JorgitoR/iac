import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import {
	ITimesheetsService,
	ITimesheetsRepository,
	Timesheet,
} from 'domain/timesheets'
import { ResponseModel } from 'domain/responseModel'
import { IAppenateService } from 'domain/appenate'

@Injectable()
export class TimesheetsService implements ITimesheetsService {
	constructor(
		@Inject('ITimesheetsRepository')
		private readonly timesheetsRepository: ITimesheetsRepository,
		@Inject('IAppenateService')
		private readonly appenateService: IAppenateService
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
			const timesheet = await this.timesheetsRepository.getById(id)
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
	async create(timesheet: any): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const data = {
				...timesheet?.Entry?.AnswersJson?.page1,
				...timesheet?.Entry?.AnswersJson?.page2,
				...timesheet?.Entry?.AnswersJson?.page3,
			}

			const { timesheetID, date, timesheetDB, staffID, timeout } = data

			if (!timesheetDB) {
				const payload = {
					timesheet_id: timesheetID || '',
					date: date || '',
					job_id: data.jobID || null,
					staff_id: Number(staffID) || null,
					actual_start: data.actualSignInTime || '',
					time_on: data.timeIn || '',
					status: 'Pending',
				}

				let timesheetCreated
				try {
					timesheetCreated = await this.timesheetsRepository.create(payload)

					await this.timesheetsRepository.updateStaff(staffID, {
						work_status: 'Signed In',
						in_out_time: data.timeIn || '',
					})
				} catch (err) {
					console.log('Error updating staff status', err)
				}
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
			} else {
				try {
					const res = await this.fetchTimesheetEntry(timesheetID)
					if (res[0]?.id) {
						const signoutPayload = {
							time_off: data?.timeout || '',
							actual_finish: data.actualSignoutTime || '',
							comments: data?.outComment || '',
						}

						await this.timesheetsRepository.updateStaff(staffID, {
							work_status: 'Signed Out',
							in_out_time: timeout || '',
						})
						await this.timesheetsRepository.update(res[0]?.id, signoutPayload)
					}
				} catch (err) {
					console.log('Failed to update timesheet', err)
				}
			}

			await this.appenateService.updateTimesheetsTable()
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Internal server error',
			})
		}
	}

	async fetchTimesheetEntry(timesheetId) {
		let timesheetData = null
		try {
			timesheetData = await this.timesheetsRepository.getByTimesheetId(
				timesheetId
			)
			console.log('timesheet', timesheetData)
		} catch (err) {
			console.log('Failed to fetch timesheet entry', err)
		}

		return timesheetData
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

			await this.appenateService.updateTimesheetsTable()

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
