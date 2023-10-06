import { Visits } from './Visit'

export interface IVisitsRepository {
	getAll(): Promise<Visits[]>
	getAllByJobId(job_id: number): Promise<Visits[]>
	getById(id: number): Promise<Visits>
	create(visit: Visits): Promise<{ created: boolean; id: number }>
	update(id: number, visit: Visits): Promise<{ updated: boolean }>
}
