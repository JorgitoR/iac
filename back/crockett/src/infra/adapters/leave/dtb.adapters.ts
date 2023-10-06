import { Injectable, Inject } from '@nestjs/common'
import { ILeaveRepository, Leave } from 'domain/leave'
import { PostgresAdapter, Leave as LeaveDb } from 'infra/database'

@Injectable()
export class LeaveDtb implements ILeaveRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Leave[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const leaves = await db.model(LeaveDb).findAll({
				include: [
					{
						model: db.model('Staff'),
						as: 'staffData',
					},
				],
			})

			const dataResult = leaves.map((item) => item.toJSON() as Leave)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Leave> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const leave = await db.model(LeaveDb).findOne({
				where: { id },
				include: [
					{
						model: db.model('Staff'),
						as: 'staffData',
					},
				],
			})

			const dataResult = leave.toJSON() as Leave
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(leave: Leave): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newLeave = await db.model(LeaveDb).create(leave as any)
			return Promise.resolve({ created: true, id: newLeave.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(id: number, leave: Leave): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			await db.model(LeaveDb).update(leave as any, { where: { id } })
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
