import { Injectable, Inject } from '@nestjs/common'
import { IHandOverRepository, HandOver } from 'domain/handover'
import {
	PostgresAdapter,
	Handover as HandOverDb,
	Jobs as JobsDb,
} from 'infra/database'

@Injectable()
export class HandoverDtb implements IHandOverRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<HandOver[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const jobs = await db.model(HandOverDb).findAll()

			const dataResult = jobs.map((item) => item.toJSON() as HandOver)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<HandOver> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const job = await db.model(HandOverDb).findByPk(id)
			if (job == null) {
				return Promise.resolve(null)
			}
			const dataResult = job.toJSON() as HandOver

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getByJobId(job_id: number): Promise<HandOver> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const job = await db.model(HandOverDb).findOne({
				where: {
					job_id,
				},
			})
			if (job == null) {
				return Promise.resolve(null)
			}
			const dataResult = job.toJSON() as HandOver

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(
		job: HandOver
	): Promise<{ created: boolean; handover_id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const created = await db.model(HandOverDb).create(job as any)
			return Promise.resolve({ created: true, handover_id: created.id })
		} catch (error) {
			return Promise.resolve({ created: false, handover_id: null })
		}
	}
	async update(id: number, handover: HandOver): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const updated = await db.model(HandOverDb).update(handover as any, {
				where: {
					id,
				},
			})
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async updateJobStatus(
		job_id: number,
		status: string
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			await db.model(JobsDb).update(
				{
					job_status: status,
				},
				{
					where: {
						id: job_id,
					},
				}
			)
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
