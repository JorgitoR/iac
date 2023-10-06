import { Injectable, Inject } from '@nestjs/common'
import { IJobsRepository, Job } from 'domain/jobs'
import {
	PostgresAdapter,
	Jobs as JobsDb,
	Client as ClientDb,
	Staff as StaffDb,
} from 'infra/database'

@Injectable()
export class JobsDtb implements IJobsRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Job[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const jobs = await db.model(JobsDb).findAll({
				include: [
					{
						model: db.model(ClientDb),
						as: 'clientData',
					},
					{
						model: db.model(StaffDb),
						as: 'estimatorData',
					},
				],
			})

			const dataResult = jobs.map((item) => item.toJSON() as Job)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Job> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const job = await db.model(JobsDb).findByPk(id, {
				include: [
					{
						model: db.model(ClientDb),
						as: 'clientData',
					},
					{
						model: db.model(StaffDb),
						as: 'estimatorData',
					},
				],
			})
			if (job == null) {
				return Promise.resolve(null)
			}
			const dataResult = job.toJSON() as Job

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(job: Job): Promise<{ created: boolean; job_id: number }> {
		try {
			const db = this.dtb.getSequelizeInstance()
			const result = await db.model(JobsDb).create(job as any)
			if (job == null) {
				return Promise.resolve({ created: false, job_id: null })
			}
			return Promise.resolve({ created: true, job_id: result.id })
		} catch (error) {
			return Promise.resolve({ created: false, job_id: null })
		}
	}
	async update(id: number, job: Job): Promise<{ updated: boolean }> {
		try {
			const db = this.dtb.getSequelizeInstance()
			const jobToUpdate = await db.model(JobsDb).findByPk(id)
			if (jobToUpdate == null) {
				return Promise.resolve({ updated: false })
			}
			await jobToUpdate.update(job)
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
