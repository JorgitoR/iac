import { Injectable, Inject } from '@nestjs/common'
import { IAssetsRepository, Asset } from 'domain/assets'
import { PostgresAdapter, Assets as AssetsDb } from 'infra/database'

@Injectable()
export class AssetsDtb implements IAssetsRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Asset[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const assets = await db.model(AssetsDb).findAll({
				include: [
					{
						model: db.model('Staff'),
						as: 'staffData',
					},
				],
			})

			const dataResult = assets.map((item) => item.toJSON() as Asset)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Asset> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const asset = await db.model(AssetsDb).findByPk(id, {
				include: [
					{
						model: db.model('Staff'),
						as: 'staffData',
					},
				],
			})
			if (asset == null) {
				return Promise.resolve(null)
			}
			const dataResult = asset.toJSON() as Asset

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(asset: Asset): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newAsset = await db.model(AssetsDb).create(asset as any)
			const dataResult = newAsset.toJSON() as Asset
			return Promise.resolve({ created: true, id: dataResult.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(id: number, asset: Asset): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db.model(AssetsDb).update(asset, {
				where: {
					id: id,
				},
			})
			return Promise.resolve({ updated: result[0] > 0 })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
