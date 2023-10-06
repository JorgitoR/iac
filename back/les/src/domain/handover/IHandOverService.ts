import { HandOver } from './HandOver'
import { ResponseModel } from '../responseModel'

export interface IHandoverService {
	getAll(): Promise<ResponseModel<HandOver[]>>
	getById(id: number): Promise<ResponseModel<HandOver>>
	getByJobId(job_id: number): Promise<ResponseModel<HandOver>>
	create(
		handover: HandOver
	): Promise<ResponseModel<{ created: boolean; handover: number }>>
	update(
		id: number,
		handover: HandOver
	): Promise<ResponseModel<{ updated: boolean }>>
}
