import { WeeklyHire } from './WeeklyHire'

export interface IWeeklyHireRepository {
	getAll(): Promise<WeeklyHire[]>
	getAllByJobId(job_id: number): Promise<WeeklyHire[]>
	getById(id: number): Promise<WeeklyHire>
	create(invoice: WeeklyHire): Promise<{ created: boolean; id: number }>
	update(id: number, invoice: WeeklyHire): Promise<{ updated: boolean }>
	delete(id: number): Promise<{ deleted: boolean }>
}
