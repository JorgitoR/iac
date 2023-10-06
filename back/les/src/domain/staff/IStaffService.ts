import { Staff } from './Staff'
import { ResponseModel } from '../responseModel'

export interface IStaffService {
	getAll(): Promise<ResponseModel<Staff[]>>
	getById(id: number): Promise<ResponseModel<Staff>>
	create(user: Staff): Promise<ResponseModel<{ created: boolean }>>
	update(id: number, staff: Staff): Promise<ResponseModel<{ updated: boolean }>>
}
