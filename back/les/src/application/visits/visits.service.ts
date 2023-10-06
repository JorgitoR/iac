import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common'
import { IVisitsService, IVisitsRepository, Visits } from 'domain/visits'
import { ResponseModel } from 'domain/responseModel'
import { IAppenateService } from 'domain/appenate/IAppenateService'
@Injectable()
export class VisitsService implements IVisitsService {
	constructor(
		@Inject('IVisitsRepository')
		private readonly visitsRepository: IVisitsRepository,
		@Inject('IAppenateService')
		private readonly appenateService: IAppenateService
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
			const newVisit = await this.visitsRepository.getById(result.id)

			await this.appenateService.updateVisitsTable({
				...newVisit,
				visit_status: 'Pending Prestart',
				status: 'Active',
				id: result.id,
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
			const newVisit = await this.visitsRepository.getById(id)
			await this.appenateService.updateVisitsTable({ id, ...newVisit })

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
	async preStart(payload: any): Promise<ResponseModel<{ created: boolean }>> {
		console.log('ENTROOPO222')
		if (typeof payload !== 'object') {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
		const data = payload?.Entry?.AnswersJson?.page1
		console.log('data >> ', data)
		const {
			jobID,
			selectVisitId,
			timeIn,
			formatTimeOn,
			supervisorId,
			staffIdList,
			staffNameList,
		} = data

		const startDayPayload = {
			job_id: jobID || null,
			visit_id: selectVisitId || null,
			supervisor_id: supervisorId || null,
			staff_labels: staffNameList?.split('|') || '',
			staff_ids: staffIdList?.split('|') || '',
			time_in: formatTimeOn || '',
			time_off: '',
			status: 'Pending Close Of Visit',
		}

		console.log('PAYLOAD  >>>> ', startDayPayload)

		try {
			await this.visitsRepository.createVisitTimesheet(startDayPayload)
		} catch (err) {
			console.log('Error creating timesheet', err)
		}

		try {
			if (selectVisitId)
				await this.visitsRepository.update(selectVisitId, {
					visit_status: 'Pending Close Of Visit',
				})
		} catch (err) {
			console.log('Error updating visit', err)
		}
		return {
			code: 201,
			data: { created: true },
			message: 'Pre start created successfully',
		}
	}
	async closeDay(payload: any): Promise<ResponseModel<{ created: boolean }>> {
		console.log('ENTROOPO222')
		if (typeof payload !== 'object') {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
		const data = payload?.Entry?.AnswersJson?.page1
		const page2Data = payload?.Entry?.AnswersJson?.page2

		const taskTable = page2Data.table
		const taskPayload = Array.isArray(taskTable)
			? taskTable
			: taskTable
			? [taskTable]
			: []

		const closeDayPayload = {
			time_off: page2Data.timeOffFormat || '',
			status: data.updateStatus,
		}

		const visitTimesheet = await this.getVisitTimesheet(data.jobID)

		console.log('PAYLOAD  >>>> ', closeDayPayload)
		console.log('visitTimesheet >>>>> ', visitTimesheet)

		if (visitTimesheet) {
			try {
				await this.visitsRepository.updateVisitTimesheet(
					visitTimesheet,
					closeDayPayload
				)
			} catch (err) {
				console.log('Error creating timesheet', err)
			}

			/* 			if (taskPayload.length) {
				taskPayload.map(async (task) => {
					await updateVisitTasks(task, visitTimesheet)
				})
			} */
			await this.updateVisitStatus(data.visitId)
		}
		return {
			code: 201,
			data: { created: true },
			message: 'Close of day created successfully',
		}
	}
	async updateVisitStatus(visit) {
		try {
			if (visit)
				await this.visitsRepository.update(visit, {
					visit_status: 'Completed',
				})
		} catch (err) {
			console.log('Error updating visit', err)
		}
	}
	async getVisitTimesheet(jobID) {
		let visitTimesheetId

		try {
			const visitTimesheet = await this.visitsRepository.getAllByJobId(
				jobID,
				''
			)
			visitTimesheetId = visitTimesheet?.[0]?.id
		} catch (err) {
			console.log('Error updating visit', err)
		}
		return visitTimesheetId
	}
}
