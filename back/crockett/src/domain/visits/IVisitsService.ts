import { Visits } from './Visit'
import { ResponseModel } from '../responseModel'

export interface IVisitsService {
	getAll(): Promise<ResponseModel<Visits[]>>
	getAllByJobID(job_id: number): Promise<ResponseModel<Visits[]>>
	getById(id: number): Promise<ResponseModel<Visits>>
	create(visit: Visits): Promise<ResponseModel<{ created: boolean }>>
	update(
		id: number,
		visit: Visits
	): Promise<ResponseModel<{ updated: boolean }>>
}
