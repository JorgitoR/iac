import { Timesheet } from './Timesheet'
import { Staff } from '../staff'
export interface ITimesheetsRepository {
	getAll(): Promise<Timesheet[]>
	getById(id: number): Promise<Timesheet>
	getAllByJobId(job_id: number): Promise<Timesheet[]>
	getAllByStaffId(staff_id: number): Promise<Timesheet[]>
	create(timesheet: Timesheet): Promise<{ created: boolean; id: number }>
	update(id: number, timesheet: Timesheet): Promise<{ updated: boolean }>
	updateStaff(id: number, staff: Staff): Promise<{ updated: boolean }>
	getByTimesheetId(timesheet_id: string): Promise<Timesheet[]>
}
