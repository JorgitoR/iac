import { Task } from './Task'
import { ResponseModel } from '../responseModel'

export interface ITaskService {
	getAll(): Promise<ResponseModel<Task[]>>
	getAllByJobID(job_id: number): Promise<ResponseModel<Task[]>>
	getById(id: number): Promise<ResponseModel<Task>>
	create(
		job_id: number,
		task: Task
	): Promise<ResponseModel<{ created: boolean }>>
	createVariation(
		job_id: number,
		task: Task
	): Promise<ResponseModel<{ created: boolean }>>
	update(id: number, task: Task): Promise<ResponseModel<{ updated: boolean }>>
	delete(id: number): Promise<ResponseModel<{ deleted: boolean }>>
}
