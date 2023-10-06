import { HandOver } from './HandOver'

export interface IHandOverRepository {
	getAll(): Promise<HandOver[]>
	getById(id: number): Promise<HandOver>
	getByJobId(job_id: number): Promise<HandOver>
	create(job: HandOver): Promise<{ created: boolean; handover_id: number }>
	update(id: number, handover: HandOver): Promise<{ updated: boolean }>
	updateJobStatus(job_id: number, status: string): Promise<{ updated: boolean }>
}
