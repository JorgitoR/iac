import { Job } from './Jobs'

export interface IJobsRepository {
	getAll(): Promise<Job[]>
	getById(id: number): Promise<Job>
	create(job: Job): Promise<{ created: boolean; job_id: number }>
	update(id: number, job: Job): Promise<{ updated: boolean }>
}
