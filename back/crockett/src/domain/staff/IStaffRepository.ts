import { Staff } from './Staff'

export interface IStaffRepository {
	getAll(): Promise<Staff[]>
	getById(id: number): Promise<Staff>
	getByEmail(email: string): Promise<Staff>
	create(user: Staff): Promise<{ created: boolean }>
	update(id: number, staff: Staff): Promise<{ updated: boolean }>
	validateStaffEmail(email: string): Promise<boolean>
}
