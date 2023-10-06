import { VisitTimesheet } from './VisitTimesheet'

export interface IVisitsTimesheetRepository {
	getAll(): Promise<VisitTimesheet[]>
	getAllByJobId(job_id: number): Promise<VisitTimesheet[]>
	getById(id: number): Promise<VisitTimesheet>
	create(
		visitTimesheet: VisitTimesheet
	): Promise<{ created: boolean; id: number }>
	update(
		id: number,
		visitTimesheet: VisitTimesheet
	): Promise<{ updated: boolean }>
}
