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
	async save(register: any): Promise<{ created: boolean; id: number }> {
		console.log('registerregister', register)
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newRegister = await db.model(ScaffoldTagsDB).create(register as any)
			const dataResult = newRegister.toJSON() as Register

			return Promise.resolve({ created: true, id: newRegister.id })
		} catch (error) {
			console.log('errorerrorerror', error)
			return Promise.resolve({ created: false, id: null })
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

	async updateScaffTag(payload) {
		const inspectionPayload = {
			last_inspection: payload?.dateDisplay,
			inspection_due: payload?.nextInspectionDisplay,
		}
		console.log('inspectionPayload >>> ', inspectionPayload)

		try {
			const response = await this.save({
				job_id: payload.jobNoExistingID || null,
				tag_no: payload.BC ? String(payload.BC) : null,
				description: payload.tagDescriptionExisting || '',
				last_inspection: payload?.dateDisplay || '',
				inspection_due: payload?.nextInspectionDisplay || '',
				uploaded_by: payload?.uploadedBy || '',
				status: 'Active',
			})

			console.log('DATA >>>>', response)
		} catch (err) {
			console.log('Failed to update inspection', err)
		}
	}
	async createNewTag(payload) {
		await this.sleep(5000)
		const fileURL =
			'FILEURL' /* await fetchFileByName(payload.fileIDHandover) */

		const tagNo = await this.incrementTagNumber(payload.jobID)

		try {
			const response = await this.save({
				job_id: payload.jobID || null,
				tag_no: payload.newBarSec.newBC
					? String(payload.newBarSec.newBC)
					: tagNo,
				description: payload.newBarSec.tagDescription || '',
				last_inspection: payload.dateDisplay || '',
				inspection_due: payload?.nextInspectionDisplay || '',
				handover_doc: fileURL,
				uploaded_by: payload?.uploadedBy || '',
				status: 'Active',
				/* taskId: Number(payload.taskId), */
			})
			console.log('RESULT CREATING TAG >>>> ', response)

			/* 			if (response) {
				this.appenateService.AppenateCreateOrUpdateRecords(
					'e255366a-02d3-4c3d-8857-aeda002faf8e',
					[
						[
							response.id,
							payload.newBarSec.newBC ? String(payload.newBarSec.newBC) : tagNo,
							payload.jobID,
							payload.newBarSec.tagDescription,
							payload.dateDisplay,
							payload.nextInspectionDisplay,
							'Active',
						],
					]
				)
			} */
			/* await updateAppEntry(payload?.fileID, data?.[0]?.id) */
		} catch (err) {
			console.log('Failed to create new tag', err)
		}
	}
	async incrementTagNumber(jobId) {
		let tagNumber = 0
		try {
			const response = await this.getAllByJobId(jobId)
			tagNumber = response.length + 1
			console.log(tagNumber)
		} catch (err) {
			console.log('Failed to increment tag #', err)
		}
		return String(tagNumber)
	}

	sleep(ms): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(function () {
				resolve()
			}, ms)
		})
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
