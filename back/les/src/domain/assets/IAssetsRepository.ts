import { Asset } from './Assets'

export interface IAssetsRepository {
	getAll(): Promise<Asset[]>
	getById(id: number): Promise<Asset>
	create(asset: Asset): Promise<{ created: boolean; id: number }>
	update(id: number, asset: Asset): Promise<{ updated: boolean }>
}
