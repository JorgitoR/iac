import { Leave } from './Leave'

export interface ILeaveRepository {
	getAll(): Promise<Leave[]>
	getById(id: number): Promise<Leave>
	create(asset: Leave): Promise<{ created: boolean; id: number }>
	update(id: number, leave: Leave): Promise<{ updated: boolean }>
}
