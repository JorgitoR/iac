import { Visits } from './Visit'
import { VisitTimesheet } from '../visits-timesheets/VisitTimesheet'
export interface IVisitsRepository {
	getAll(): Promise<Visits[]>
	getAllByJobId(job_id: number): Promise<Visits[]>
	getById(id: number): Promise<Visits>
	create(visit: Visits): Promise<{ created: boolean; id: number }>
	update(id: number, visit: Visits): Promise<{ updated: boolean }>
	createVisitTimesheet(
		visitTimesheet: VisitTimesheet
	): Promise<{ created: boolean; id: number }>
	getAllByJobId(job_id: number, time_off: string): Promise<Visits[]>
	updateVisitTimesheet(
		id: number,
		visitTimesheet: VisitTimesheet
	): Promise<{ updated: boolean }>
}
