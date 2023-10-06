import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { ILeaveService, Leave, ILeaveRepository } from 'domain/leave'
import { ITimesheetsService } from 'domain/timsheets'
import { ResponseModel } from 'domain/responseModel'
import moment from 'moment'

@Injectable()
export class LeaveService implements ILeaveService {
	constructor(
		@Inject('ILeaveRepository')
		private readonly leaveRepository: ILeaveRepository,
		@Inject('ITimesheetsService')
		private readonly timesheetsService: ITimesheetsService
	) {}
	async getAll(): Promise<ResponseModel<Leave[]>> {
		try {
			const leaves = await this.leaveRepository.getAll()
			return Promise.resolve({
				data: leaves,
				code: 200,
				message: 'Success',
			})
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getById(id: number): Promise<ResponseModel<Leave>> {
		try {
			const leave = await this.leaveRepository.getById(id)
			if (!leave) {
				throw new NotFoundException({
					code: 404,
					message: 'Not Found',
					data: null,
				})
			}
			return Promise.resolve({
				data: leave,
				code: 200,
				message: 'Success',
			})
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async create(leave: Leave): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const { created, id } = await this.leaveRepository.create(leave)
			if (!created) {
				throw new ConflictException({
					code: 409,
					message: 'Conflict',
					data: null,
				})
			}
			return Promise.resolve({
				data: { created: true, id },
				code: 201,
				message: 'Created',
			})
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
		asset: Leave
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const { updated } = await this.leaveRepository.update(id, asset)
			if (!updated) {
				throw new ConflictException({
					code: 409,
					message: 'Conflict',
					data: null,
				})
			}
			return Promise.resolve({
				data: { updated: true },
				code: 200,
				message: 'Success',
			})
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async approve(
		id: number,
		approvedBy: string
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const currLeave = await this.leaveRepository.getById(id)
			if (!currLeave) {
				throw new NotFoundException({
					code: 404,
					message: 'Leave Not Found',
					data: null,
				})
			}
			if (currLeave.status !== 'pending') {
				throw new ConflictException({
					code: 409,
					message: 'Leave Already Approved',
					data: null,
				})
			}
			const { updated } = await this.leaveRepository.update(id, {
				...currLeave,
				status: 'Approved',
				approvedBy: approvedBy,
			})

			if (!updated) {
				throw new ConflictException({
					code: 409,
					message: 'Conflict',
					data: null,
				})
			}

			const diffDays = moment(currLeave.endDate, 'DD/MM/YYYY').diff(
				moment(currLeave.startDate, 'DD/MM/YYYY'),
				'days'
			)

			for (let i = 0; i <= diffDays; i++) {
				const date = moment(currLeave.startDate, 'DD/MM/YYYY')
					.add(i, 'days')
					.format('DD/MM/YYYY')

				await this.timesheetsService.create({
					staff_id: currLeave.staffId,
					date: date,
					time_on: '07:00',
					time_off: '16:00',
					actual_finish: '16:00',
					job_id: null,
					approved_by: approvedBy,
					exported: 'No',
					comments: 'Leave',
					hours: 8,
					status: 'Pending',
					timesheet_id: null,
					id: null,
				})
			}

			return Promise.resolve({
				data: { updated: true },
				code: 200,
				message: 'Success',
			})
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async decline(
		id: number,
		approvedBy: string
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const currLeave = await this.leaveRepository.getById(id)
			if (!currLeave) {
				throw new NotFoundException({
					code: 404,
					message: 'Leave Not Found',
					data: null,
				})
			}
			if (currLeave.status !== 'pending') {
				throw new ConflictException({
					code: 409,
					message: 'Leave Already Declined',
					data: null,
				})
			}
			const { updated } = await this.leaveRepository.update(id, {
				...currLeave,
				status: 'Declined',
				approvedBy: approvedBy,
			})

			if (!updated) {
				throw new ConflictException({
					code: 409,
					message: 'Conflict',
					data: null,
				})
			}
			return Promise.resolve({
				data: { updated: true },
				code: 200,
				message: 'Success',
			})
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
}
