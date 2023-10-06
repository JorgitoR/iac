import { Injectable, Inject } from '@nestjs/common'
import { IRegisterRepository } from 'domain/scaffold-register/IRegisterRepository'
import {
	PostgresAdapter,
	ScaffoldTags as ScaffoldTagsDB,
	Jobs as JobsDB,
} from 'infra/database'
import { Register } from 'domain/scaffold-register/Register'

@Injectable()
export class RegisterDtb implements IRegisterRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAllByJobId(job_id: number): Promise<Register[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(ScaffoldTagsDB).findAll({
				where: {
					job_id: job_id,
				},
			})
			if (task == null) {
				return Promise.resolve(null)
			}
			const dataValues = task.map((item) => item.toJSON() as Register)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAll(): Promise<Register[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const tasks = await db.model(ScaffoldTagsDB).findAll()

			const dataResult = tasks.map((item) => item.toJSON() as Register)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getByTagNo(tag_no: string): Promise<Register> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(ScaffoldTagsDB).findOne({
				where: {
					tag_no: tag_no,
				},
			})
			if (task == null) {
				return Promise.resolve(null)
			}
			return task.toJSON() as Register
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getById(id: string): Promise<Register> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(ScaffoldTagsDB).findByPk(id, {
				include: [
					{
						model: db.model(JobsDB),
						as: 'jobData',
					},
				],
			})
			if (task == null) {
				return Promise.resolve(null)
			}
			return task.toJSON() as Register
		} catch (error) {
			console.log(error)
			return Promise.resolve(null)
		}
	}
	async save(register: any): Promise<any> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = db.model('ScaffoldTags').create(register)
			return data
		} catch (error) {
			return error.message
		}
	}
	async get(): Promise<any> {
		const db = await this.dtb.getSequelizeInstance()
		const data = db.model('ScaffoldTags').findAll()
		return data
	}

	async validateJobs(id: number): Promise<boolean> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = db
				.model('Jobs')
				.findOne({ where: { id } })
				.then((data) => {
					if (data == null) {
						return false
					}
					return true
				})
				.catch((err) => {
					return false
				})
			return data
		} catch (error) {
			return false
		}
	}

	async validateTag(tag_no: string): Promise<boolean> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = db
				.model('ScaffoldTags')
				.findOne({ where: { tag_no } })
				.then((data) => {
					if (data == null) {
						return false
					}
					return true
				})
				.catch((err) => {
					return false
				})
			return data
		} catch (error) {
			return false
		}
	}

	async update(id: string, register: Register): Promise<any> {
		const db = await this.dtb.getSequelizeInstance()
		const data = db.model('ScaffoldTags').update(register, {
			where: {
				id: id,
			},
		})
		return data
	}
}
