import { Injectable, Inject } from '@nestjs/common'
import { IAppFilesRepository, AppFile } from 'domain/appFiles'
import { PostgresAdapter, AppEntrys as AppFilesDb } from 'infra/database'

@Injectable()
export class AppFilesDtb implements IAppFilesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({})

			const dataResult = appFiles.map((item) => item.toJSON() as AppFile)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getAllbyAssetId(id: number): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({
				where: {
					asset_id: id,
				},
			})
			if (appFiles == null) {
				return Promise.resolve(null)
			}
			const dataValues = appFiles.map((item) => item.toJSON() as AppFile)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyClientsId(id: number): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({
				where: {
					client_id: id,
				},
			})
			if (appFiles == null) {
				return Promise.resolve(null)
			}
			const dataValues = appFiles.map((item) => item.toJSON() as AppFile)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyJobId(id: number): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({
				where: {
					job_id: id,
				},
			})
			if (appFiles == null) {
				return Promise.resolve(null)
			}
			const dataValues = appFiles.map((item) => item.toJSON() as AppFile)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyVisitId(id: number): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({
				where: {
					visit_id: id,
				},
			})
			if (appFiles == null) {
				return Promise.resolve(null)
			}
			const dataValues = appFiles.map((item) => item.toJSON() as AppFile)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyVehicleId(id: number): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({
				where: {
					vehicle_id: id,
				},
			})
			if (appFiles == null) {
				return Promise.resolve(null)
			}
			const dataValues = appFiles.map((item) => item.toJSON() as AppFile)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyTagId(id: number): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({
				where: {
					tag_id: id,
				},
			})
			if (appFiles == null) {
				return Promise.resolve(null)
			}
			const dataValues = appFiles.map((item) => item.toJSON() as AppFile)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllbyStaffId(id: number): Promise<AppFile[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFiles = await db.model(AppFilesDb).findAll({
				where: {
					staff_id: id,
				},
			})
			if (appFiles == null) {
				return Promise.resolve(null)
			}
			const dataValues = appFiles.map((item) => item.toJSON() as AppFile)
			return dataValues
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getById(id: number): Promise<AppFile> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFile = await db.model(AppFilesDb).findByPk(id)
			if (appFile == null) {
				return Promise.resolve(null)
			}
			return appFile.toJSON() as AppFile
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(app_file: AppFile): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFile = await db.model(AppFilesDb).create(app_file as any)
			if (appFile == null) {
				return Promise.resolve(null)
			}
			return { created: true, id: appFile.id }
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async update(id: number, app_file: AppFile): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const appFile = await db.model(AppFilesDb).findByPk(id)
			if (appFile == null) {
				return Promise.resolve({
					updated: false,
				})
			}
			await appFile.update(app_file as any)
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
			const appFile = await db.model(AppFilesDb).findByPk(id)
			if (appFile == null) {
				return Promise.resolve({
					deleted: false,
				})
			}
			await appFile.destroy()
			return { deleted: true }
		} catch (error) {
			return Promise.resolve({
				deleted: false,
			})
		}
	}
}
