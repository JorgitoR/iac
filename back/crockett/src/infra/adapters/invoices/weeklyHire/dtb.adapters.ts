import { Injectable, Inject } from '@nestjs/common'
import { IWeeklyHireRepository, WeeklyHire } from 'domain/invoices'
import {
	PostgresAdapter,
	WeeklyHireInvoices as WeeklyHireDb,
} from 'infra/database'

@Injectable()
export class WeeklyHireDtb implements IWeeklyHireRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<WeeklyHire[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const tasks = await db.model(WeeklyHireDb).findAll({
				include: [
					{
						model: db.model('Jobs'),
						as: 'jobData',
					},
				],
			})

			const dataResult = tasks.map((item) => item.toJSON() as WeeklyHire)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getAllByJobId(job_id: number): Promise<WeeklyHire[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const tasks = await db.model(WeeklyHireDb).findAll({
				where: {
					job_id: job_id,
				},
				include: [
					{
						model: db.model('Jobs'),
						as: 'jobData',
					},
				],
			})

			const dataResult = tasks.map((item) => item.dataValues as WeeklyHire)
			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<WeeklyHire> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(WeeklyHireDb).findByPk(id, {
				include: [
					{
						model: db.model('Jobs'),
						as: 'jobData',
					},
				],
			})
			if (task == null) {
				return Promise.resolve(null)
			}
			const dataResult = task.toJSON() as WeeklyHire

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(invoice: WeeklyHire): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTask = await db.model(WeeklyHireDb).create(invoice as any)
			const dataResult = newTask.toJSON() as WeeklyHire
			return Promise.resolve({ created: true, id: dataResult.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(id: number, invoice: WeeklyHire): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(WeeklyHireDb).findByPk(id)
			if (task == null) {
				return Promise.resolve({ updated: false })
			}
			await task.update(invoice as any)
			return Promise.resolve({ updated: true })
		} catch (error) {
			console.log(error)
			return Promise.resolve({ updated: false })
		}
	}
	async delete(id: number): Promise<{ deleted: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const invoice = await db.model(WeeklyHireDb).findByPk(id)
			if (invoice == null) {
				return Promise.resolve({ deleted: false })
			}
			await invoice.update({ status: 'Deleted' })
			return Promise.resolve({ deleted: true })
		} catch (error) {
			return Promise.resolve({ deleted: false })
		}
	}
}
