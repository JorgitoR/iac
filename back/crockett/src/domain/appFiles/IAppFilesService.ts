import { AppFile } from './AppFile'
import { ResponseModel } from '../responseModel'

export interface IAppFilesService {
	getAll(): Promise<ResponseModel<AppFile[]>>
	getAllbyAssetId(id: number): Promise<ResponseModel<AppFile[]>>
	getAllbyClientsId(id: number): Promise<ResponseModel<AppFile[]>>
	getAllbyJobId(id: number): Promise<ResponseModel<AppFile[]>>
	getAllbyVisitId(id: number): Promise<ResponseModel<AppFile[]>>
	getAllbyVehicleId(id: number): Promise<ResponseModel<AppFile[]>>
	getAllbyTagId(id: number): Promise<ResponseModel<AppFile[]>>
	getAllbyStaffId(id: number): Promise<ResponseModel<AppFile[]>>
	getById(id: number): Promise<ResponseModel<AppFile>>
	create(asset: AppFile): Promise<ResponseModel<{ created: boolean }>>
	update(
		id: number,
		asset: AppFile
	): Promise<ResponseModel<{ updated: boolean }>>
	delete(id: number): Promise<ResponseModel<{ deleted: boolean }>>
}
