import { Notes } from './Notes'
import { ResponseModel } from '../responseModel'

export interface INotesService {
	getAll(): Promise<ResponseModel<Notes[]>>
	getAllbyAssetId(id: number): Promise<ResponseModel<Notes[]>>
	getAllbyClientsId(id: number): Promise<ResponseModel<Notes[]>>
	getAllbyJobId(id: number): Promise<ResponseModel<Notes[]>>
	getAllbyVisitId(id: number): Promise<ResponseModel<Notes[]>>
	getAllbyVehicleId(id: number): Promise<ResponseModel<Notes[]>>
	getAllbyTagId(id: number): Promise<ResponseModel<Notes[]>>
	getAllbyStaffId(id: number): Promise<ResponseModel<Notes[]>>
	getById(id: number): Promise<ResponseModel<Notes>>
	create(asset: Notes): Promise<ResponseModel<{ created: boolean }>>
	update(id: number, asset: Notes): Promise<ResponseModel<{ updated: boolean }>>
	delete(id: number): Promise<ResponseModel<{ deleted: boolean }>>
}
