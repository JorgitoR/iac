import { ServiceRate } from './ServiceRates'

export interface IServiceRatesRepository {
	getAll(): Promise<ServiceRate[]>
	create(service_rates: ServiceRate): Promise<{ created: boolean }>
	update(id: number, service_rate: ServiceRate): Promise<{ updated: boolean }>
}
