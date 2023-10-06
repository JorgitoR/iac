import {
	Injectable,
	Inject,
	UnauthorizedException,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import { ITaskService, ITaskRepository, Task } from 'domain/task'
import { ResponseModel } from 'domain/responseModel'
import { IInvoicesService } from 'domain/invoices'

@Injectable()
export class TaskService implements ITaskService {
	constructor(
		@Inject('ITasksRepository')
		private readonly taskRepository: ITaskRepository,
		@Inject('IInvoicesService')
		private readonly invoicesService: IInvoicesService
	) {}

	async getAll(): Promise<ResponseModel<Task[]>> {
		try {
			const tasks = await this.taskRepository.getAll()
			return Promise.resolve({
				data: tasks,
				code: 200,
				message: 'Task of the app',
			})
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

	async getById(id: number): Promise<ResponseModel<Task>> {
		const task = await this.taskRepository.getById(id)
		if (!task) {
			throw new NotFoundException(
				new NotFoundException({
					code: 404,
					message: 'Task not Found',
					data: null,
				})
			)
		}

		return { data: task, code: 200, message: 'OK' }
	}
	async getAllByJobID(job_id: number): Promise<ResponseModel<Task[]>> {
		try {
			const tasks = await this.taskRepository.getAllByJobId(job_id)
			return Promise.resolve({ data: tasks, code: 200, message: 'OK' })
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

	async create(
		job_id: number,
		task: Task
	): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const result = await this.taskRepository.create({
				...task,
				job_id: job_id,
			})

			const EDInvoice = await this.invoicesService.createEdinvoice(job_id, {
				job_id: job_id,
				zone: task.zone,
				zone_label: task.zone_label,
				type: task.type,
				description: task.description,
				erect_percent: 0,
				erect: 0,
				dismantle_percent: 0,
				dismantle: 0,
				total: task.task_value || 0,
				complete_percent: 0,
				last_time_updated: undefined,
				status: 'Pending',
				task_id: result.id,
				PO_Number: task.PO_Number,
				Quote_Number: task.quote_num || '',
				xeroReference: '',
			})

			const weeklyHire = await this.invoicesService.createWeeklyHire(job_id, {
				job_id: job_id,
				zone: task.zone,
				zone_label: task.zone_label,
				type: task.type,
				description: task.description,
				on_hire: 'No',
				completed: 0,
				date_on_hire: '',
				days_on_hire: 0,
				weekly_hire_rate: task.hire_rate || 0,
				total: 0,
				completed_date: '',
				handover_url: '',
				task_id: result.id,
				status: 'Pending',
				xeroReference: '',
			})

			return Promise.resolve({
				data: { created: result.created },
				code: 200,
				message: 'OK',
			})
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

	async createVariation(
		job_id: number,
		task: Task
	): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const result = await this.create(job_id, {
				...task,
				task_type: 'Variation',
			})
			return Promise.resolve({
				data: { created: result.data.created },
				code: 200,
				message: 'OK',
			})
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
	async update(
		id: number,
		task: Task
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const taskExists = await this.taskRepository.getById(id)
			const percentage_complete = Number(
				(
					Number(task.percentage_erect * 0.7) +
					Number(task.percentage_dismantle * 0.3)
				).toFixed(2)
			)
			let complete = ''
			if (percentage_complete === 100) {
				complete = 'Yes'
			} else {
				complete = 'No'
			}

			const result = await this.taskRepository.update(id, {
				...taskExists,
				...task,
				percentage_complete,
				complete,
			})
			return {
				data: { updated: result.updated },
				code: 200,
				message: 'OK',
			}
		} catch (error) {
			new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async delete(id: number): Promise<ResponseModel<{ deleted: boolean }>> {
		try {
			const result = await this.taskRepository.delete(id)
			return {
				data: { deleted: result.deleted },
				code: 200,
				message: 'OK',
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
