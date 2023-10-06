export interface IAppenateService {
	updateVisitsTable(payload?: object): Promise<{ updated: boolean }>
	updateAssetsTable(payload?: object): Promise<{ updated: boolean }>
	updateVehiclesTable(payload?: object): Promise<{ updated: boolean }>
	updateTimesheetsTable(payload?: object): Promise<{ updated: boolean }>
	updateTaskTable(payload?: object): Promise<{ updated: boolean }>
	updateStaffTable(payload?: object): Promise<{ updated: boolean }>
	updateRegisterTable(payload?: object): Promise<{ updated: boolean }>
	updateJobsTable(payload?: object): Promise<{ updated: boolean }>
	updateHandoverTable(payload?: object): Promise<{ updated: boolean }>
	updateClientsTable(payload?: object): Promise<{ updated: boolean }>
	updateClientsService(payload?: object): Promise<{ updated: boolean }>
}
