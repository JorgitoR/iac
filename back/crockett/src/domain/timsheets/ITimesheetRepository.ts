import { Timesheet } from './Timesheet'

export interface ITimesheetsRepository {
	getAll(): Promise<Timesheet[]>
	getAllById(id: number): Promise<Timesheet>
	getAllByJobId(job_id: number): Promise<Timesheet[]>
	getAllByStaffId(staff_id: number): Promise<Timesheet[]>
	create(timesheet: Timesheet): Promise<{ created: boolean }>
	update(id: number, timesheet: Timesheet): Promise<{ updated: boolean }>
}
