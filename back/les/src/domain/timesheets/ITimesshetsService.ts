import { Timesheet } from './Timesheet'
import { ResponseModel } from '../responseModel'

export interface ITimesheetsService {
	getAll(): Promise<ResponseModel<Timesheet[]>>
	getById(id: number): Promise<ResponseModel<Timesheet>>
	getAllByJobId(job_id: number): Promise<ResponseModel<Timesheet[]>>
	getAllByStaffId(staff_id: number): Promise<ResponseModel<Timesheet[]>>
	create(timesheet: Timesheet): Promise<ResponseModel<{ created: boolean }>>
	update(
		id: number,
		timesheet: Timesheet
	): Promise<ResponseModel<{ updated: boolean }>>
}
