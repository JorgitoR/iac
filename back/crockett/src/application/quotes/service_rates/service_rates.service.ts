import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import {
	IServiceRatesService,
	IServiceRatesRepository,
	ServiceRate,
} from 'domain/quotes/service_rates'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class ServiceRatesService implements IServiceRatesService {
	constructor(
		@Inject('IServiceRatesRepository')
		private readonly serviceRatesRepository: IServiceRatesRepository
	) {}
	async getAll(): Promise<ResponseModel<ServiceRate[]>> {
		try {
			const service_rates = await this.serviceRatesRepository.getAll()
			return {
				code: 200,
				message: 'Service Rates found',
				data: service_rates,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: [],
			})
		}
	}
	async create(
		service_rates: ServiceRate[]
	): Promise<ResponseModel<{ created: boolean }>> {
		try {
			for (const iterator of service_rates) {
				const service_rate = await this.serviceRatesRepository.create(iterator)
				if (!service_rate) {
					throw new ConflictException({
						code: 409,
						message: 'Service Rates not created',
						data: { created: false },
					})
				}
			}
			return {
				code: 200,
				message: 'Service Rates created',
				data: { created: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: [],
			})
		}
	}
	async update(
		service_rates: ServiceRate[]
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			for (const iterator of service_rates) {
				if (!iterator.id) {
					const service_rate = await this.serviceRatesRepository.create(
						iterator
					)
					if (!service_rate) {
						throw new ConflictException({
							code: 409,
							message: 'Service Rates not created',
							data: { created: false },
						})
					}
				} else {
					const service_rate = await this.serviceRatesRepository.update(
						iterator.id,
						iterator
					)
					if (!service_rate) {
						throw new ConflictException({
							code: 409,
							message: 'Service Rates not updated',
							data: { updated: false },
						})
					}
				}
			}
		} catch (error) {
			return {
				code: 500,
				message: 'Internal Server Error',
				data: { updated: false },
			}
		}
	}
}
