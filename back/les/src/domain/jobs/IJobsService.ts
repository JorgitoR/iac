import { Job } from './Jobs'
import { ResponseModel } from '../responseModel'

export interface IJobsService {
	getAll(): Promise<ResponseModel<Job[]>>
	getById(id: number): Promise<ResponseModel<Job>>
	create(job: Job): Promise<ResponseModel<{ created: boolean; job_id: number }>>
	update(id: number, job: Job): Promise<ResponseModel<{ updated: boolean }>>
}
