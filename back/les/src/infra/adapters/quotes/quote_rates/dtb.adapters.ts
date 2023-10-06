import { Injectable, Inject } from '@nestjs/common'
import { IQuoteRatesRepository, QuoteRate } from 'domain/quotes/quote_rates'
import { PostgresAdapter, QuoteRates as QuoteRatesDb } from 'infra/database'

@Injectable()
export class QuoteRatesdtb implements IQuoteRatesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAllbyQuoteID(quote_id: number): Promise<QuoteRate[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(QuoteRatesDb).findAll({
				where: { quote_id: quote_id },
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			})
			if (data == null) {
				return Promise.resolve([])
			}
			const dataResult = data.map((item) => item.toJSON() as QuoteRate)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async create(quote_rate: QuoteRate): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db.model(QuoteRatesDb).create(quote_rate as any)
			if (result == null) {
				return Promise.resolve({ created: false })
			}
			return Promise.resolve({ created: true })
		} catch (error) {
			return Promise.resolve({ created: false })
		}
	}
	async upsert(
		id: number,
		quote_rate: QuoteRate
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db
				.model(QuoteRatesDb)
				.update(quote_rate as any, { where: { id: id } })
			if (result == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
