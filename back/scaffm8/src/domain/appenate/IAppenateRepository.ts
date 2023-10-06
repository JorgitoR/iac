import { AppenateObj } from './AppenateDataSourceOBJ'

export interface IAppenateRepository {
	AppenateCreateOrUpdateRecords(
		tableId: string,
		payload: AppenateObj
	): Promise<{ created: boolean }>
}
