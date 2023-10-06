import { VisitTimesheet } from './VisitTimesheet'
import { ResponseModel } from '../responseModel'

export interface IVisitsTimesheetsService {
	getAllByJobID(job_id: number): Promise<ResponseModel<VisitTimesheet[]>>
	getById(id: number): Promise<ResponseModel<VisitTimesheet>>
	create(
		job_id: number,
		visitTimesheet: VisitTimesheet
	): Promise<ResponseModel<{ created: boolean }>>
	update(
		id: number,
		visitTimesheet: VisitTimesheet
	): Promise<ResponseModel<{ updated: boolean }>>
}
