import { Register } from './Register'
import { ResponseModel } from '../responseModel'

export interface IRegisterService {
	getAllRegister(): Promise<ResponseModel<Object>>
	getScaffoldRegisterByTagNo(tag_no: string): Promise<ResponseModel<Register>>
	getScaffoldRegisterByJobId(job_id: number): Promise<ResponseModel<Register[]>>
	getScaffoldRegisterById(id: string): Promise<ResponseModel<Register>>
	createScaffoldRegister(register: Register): Promise<ResponseModel<Register>>
	updateRegister(id: string, register: Register): Promise<ResponseModel<Object>>
}
