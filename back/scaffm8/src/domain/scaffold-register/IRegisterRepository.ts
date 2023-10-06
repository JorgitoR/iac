import { Register } from './Register'

export interface IRegisterRepository {
	getAll(): Promise<Register[]>
	getAllByJobId(job_id: number): Promise<Register[]>
	getByTagNo(tag_no: string): Promise<Register>
	getById(id: string): Promise<Register>
	save(register: Register): Promise<{ created: boolean; id: number }>
	validateJobs(id: number): Promise<boolean>
	validateTag(tag_no: string): Promise<boolean>
	update(id: string, register: Register): Promise<any>
	createNewTag(register: Register): void
	updateScaffTag(register: Register): void
}
