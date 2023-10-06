import { AppFile } from './AppFile'

export interface IAppFilesRepository {
	getAll(): Promise<AppFile[]>
	getAllbyAssetId(id: number): Promise<AppFile[]>
	getAllbyClientsId(id: number): Promise<AppFile[]>
	getAllbyJobId(id: number): Promise<AppFile[]>
	getAllbyVisitId(id: number): Promise<AppFile[]>
	getAllbyVehicleId(id: number): Promise<AppFile[]>
	getAllbyTagId(id: number): Promise<AppFile[]>
	getAllbyStaffId(id: number): Promise<AppFile[]>
	getById(id: number): Promise<AppFile>
	create(app_file: AppFile): Promise<{ created: boolean; id: number }>
	update(id: number, app_file: AppFile): Promise<{ updated: boolean }>
	delete(id: number): Promise<{ deleted: boolean }>
}
