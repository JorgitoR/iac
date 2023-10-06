import { ServiceRate } from './ServiceRates'
import { ResponseModel } from 'domain/responseModel'

export interface IServiceRatesService {
	getAll(): Promise<ResponseModel<ServiceRate[]>>
	create(
		service_rates: ServiceRate[]
	): Promise<ResponseModel<{ created: boolean }>>
	update(
		service_rates: ServiceRate[]
	): Promise<ResponseModel<{ updated: boolean }>>
}
