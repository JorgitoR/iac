import { Injectable, Inject } from '@nestjs/common'
import { INotesRepository, Notes } from '../../../domain/notes'
import { PostgresAdapter, Notes as NotesDb } from 'infra/database'

@Injectable()
export class NotesDtb implements INotesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({})

			const dataResult = Notes.map((item) => item.toJSON() as Notes)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getAllbyAssetId(id: number): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({
				where: {
					asset_id: id,
				},
			})
			if (Notes == null) {
				return Promise.resolve(null)
			}
			const dataValues = Notes.map((item) => item.toJSON() as Notes)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyClientsId(id: number): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({
				where: {
					client_id: id,
				},
			})
			if (Notes == null) {
				return Promise.resolve(null)
			}
			const dataValues = Notes.map((item) => item.toJSON() as Notes)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyJobId(id: number): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({
				where: {
					job_id: id,
				},
			})
			if (Notes == null) {
				return Promise.resolve(null)
			}
			const dataValues = Notes.map((item) => item.toJSON() as Notes)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyVisitId(id: number): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({
				where: {
					visit_id: id,
				},
			})
			if (Notes == null) {
				return Promise.resolve(null)
			}
			const dataValues = Notes.map((item) => item.toJSON() as Notes)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyVehicleId(id: number): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({
				where: {
					vehicle_id: id,
				},
			})
			if (Notes == null) {
				return Promise.resolve(null)
			}
			const dataValues = Notes.map((item) => item.toJSON() as Notes)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyTagId(id: number): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({
				where: {
					staff_id: id,
				},
			})
			if (Notes == null) {
				return Promise.resolve(null)
			}
			const dataValues = Notes.map((item) => item.toJSON() as Notes)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyStaffId(id: number): Promise<Notes[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findAll({
				where: {
					staff_id: id,
				},
			})
			if (Notes == null) {
				return Promise.resolve(null)
			}
			const dataValues = Notes.map((item) => item.toJSON() as Notes)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getById(id: number): Promise<Notes> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findByPk(id)
			if (Notes == null) {
				return Promise.resolve(null)
			}
			return Notes.toJSON() as Notes
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(app_file: Notes): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).create(app_file as any)
			if (Notes == null) {
				return Promise.resolve(null)
			}
			console.log('......')
			return { created: true, id: Notes.id }
		} catch (error) {
			console.log(error)
			console.log('......')
			return Promise.resolve(null)
		}
	}
	async update(id: number, app_file: Notes): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findByPk(id)
			if (Notes == null) {
				return Promise.resolve({
					updated: false,
				})
			}
			await Notes.update(app_file as any)
			return { updated: true }
		} catch (error) {
			return Promise.resolve({
				updated: false,
			})
		}
	}
	async delete(id: number): Promise<{ deleted: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const Notes = await db.model(NotesDb).findByPk(id)
			if (Notes == null) {
				return Promise.resolve({
					deleted: false,
				})
			}
			await Notes.destroy()
			return { deleted: true }
		} catch (error) {
			return Promise.resolve({
				deleted: false,
			})
		}
	}
}
