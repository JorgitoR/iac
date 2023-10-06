import { Notes } from './Notes'

export interface INotesRepository {
	getAll(): Promise<Notes[]>
	getAllbyAssetId(id: number): Promise<Notes[]>
	getAllbyClientsId(id: number): Promise<Notes[]>
	getAllbyJobId(id: number): Promise<Notes[]>
	getAllbyVisitId(id: number): Promise<Notes[]>
	getAllbyVehicleId(id: number): Promise<Notes[]>
	getAllbyTagId(id: number): Promise<Notes[]>
	getAllbyStaffId(id: number): Promise<Notes[]>
	getById(id: number): Promise<Notes>
	create(notes: Notes): Promise<{ created: boolean; id: number }>
	update(id: number, notes: Notes): Promise<{ updated: boolean }>
	delete(id: number): Promise<{ deleted: boolean }>
}
