import { Injectable, Inject } from '@nestjs/common'
import { IQuoteZonesRepository, QuoteZone } from 'domain/quotes/quote_zones'
import { PostgresAdapter, QuoteZones as QuoteZonesDb } from 'infra/database'

@Injectable()
export class QuoteZonesdtb implements IQuoteZonesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAllbyQuoteID(quote_id: number): Promise<QuoteZone[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(QuoteZonesDb).findAll({
				where: { quote_id: quote_id },
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			})
			if (data == null) {
				return Promise.resolve([])
			}
			const dataResult = data.map((item) => item.toJSON() as QuoteZone)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async create(quote_zone: QuoteZone): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db.model(QuoteZonesDb).create(quote_zone as any)
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
		quote_zone: QuoteZone
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db
				.model(QuoteZonesDb)
				.update(quote_zone as any, { where: { id: id } })
			if (result == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
