import { Asset } from './Assets'
import { ResponseModel } from '../responseModel'

export interface IAssetsService {
	getAll(): Promise<ResponseModel<Asset[]>>
	getById(id: number): Promise<ResponseModel<Asset>>
	create(asset: Asset): Promise<ResponseModel<{ created: boolean }>>
	update(id: number, asset: Asset): Promise<ResponseModel<{ updated: boolean }>>
}
