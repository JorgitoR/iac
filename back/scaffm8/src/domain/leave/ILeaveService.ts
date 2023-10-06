import { Leave } from './Leave'
import { ResponseModel } from '../responseModel'

export interface ILeaveService {
	getAll(): Promise<ResponseModel<Leave[]>>
	getById(id: number): Promise<ResponseModel<Leave>>
	create(leave: Leave): Promise<ResponseModel<{ created: boolean }>>
	update(id: number, leave: Leave): Promise<ResponseModel<{ updated: boolean }>>
	approve(
		id: number,
		approvedBy: string
	): Promise<ResponseModel<{ updated: boolean }>>
	decline(
		id: number,
		approvedBy: string
	): Promise<ResponseModel<{ updated: boolean }>>
}
