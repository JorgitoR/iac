import { Injectable, Inject } from '@nestjs/common'
import { IEDInvoicesRepository, Edinvoice } from 'domain/invoices'
import { PostgresAdapter, EdInvoices as EDInvoicesDb } from 'infra/database'

@Injectable()
export class EDInvoicesDtb implements IEDInvoicesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Edinvoice[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const tasks = await db.model(EDInvoicesDb).findAll({
				include: [
					{
						model: db.model('Jobs'),
						as: 'jobData',
					},
				],
			})

			const dataResult = tasks.map((item) => item.toJSON() as Edinvoice)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getAllByJobId(job_id: number): Promise<Edinvoice[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const tasks = await db.model(EDInvoicesDb).findAll({
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

			const dataResult = tasks.map((item) => item.dataValues as Edinvoice)
			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Edinvoice> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(EDInvoicesDb).findByPk(id, {
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
			const dataResult = task.toJSON() as Edinvoice

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(invoice: Edinvoice): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTask = await db.model(EDInvoicesDb).create(invoice as any)
			const dataResult = newTask.toJSON() as Edinvoice
			return Promise.resolve({ created: true, id: dataResult.id })
		} catch (error) {
			console.log(error)
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(id: number, invoice: Edinvoice): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const updated = await db
				.model(EDInvoicesDb)
				.update(invoice as any, { where: { id: id } })
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async delete(id: number): Promise<{ deleted: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const invoice = await db.model(EDInvoicesDb).findByPk(id)
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
