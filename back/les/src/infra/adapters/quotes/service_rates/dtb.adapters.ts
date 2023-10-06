import { Injectable, Inject } from '@nestjs/common'
import {
	IServiceRatesRepository,
	ServiceRate,
} from 'domain/quotes/service_rates'
import { PostgresAdapter, ServiceRates as ServiceRatesDb } from 'infra/database'

@Injectable()
export class ServiceRatesdtb implements IServiceRatesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<ServiceRate[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(ServiceRatesDb).findAll({
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			})
			if (data == null) {
				return Promise.resolve([])
			}
			const dataResult = data.map((item) => item.toJSON() as ServiceRate)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async create(service_rates: ServiceRate): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db
				.model(ServiceRatesDb)
				.bulkCreate(service_rates as any)
			if (result == null) {
				return Promise.resolve({ created: false })
			}
			return Promise.resolve({ created: true })
		} catch (error) {
			return Promise.resolve({ created: false })
		}
	}
	async update(
		id: number,
		service_rates: ServiceRate
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db
				.model(ServiceRatesDb)
				.update(service_rates as any, { where: { id: id } })
			if (result == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
