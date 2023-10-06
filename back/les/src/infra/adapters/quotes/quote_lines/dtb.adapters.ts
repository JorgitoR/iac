import { Injectable, Inject } from '@nestjs/common'
import { IQuoteLinesRepository, QuoteLine } from 'domain/quotes/quote_lines'
import { PostgresAdapter, QuoteLines as QuoteLinesDb } from 'infra/database'

@Injectable()
export class QuoteLinesdtb implements IQuoteLinesRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAllByQuoteID(quote_id: number): Promise<QuoteLine[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(QuoteLinesDb).findAll({
				where: { quote_id: quote_id },
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			})
			if (data == null) {
				return []
			}
			const dataResult = data.map((item) => item.toJSON() as QuoteLine)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async create(quote_line: QuoteLine): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db.model(QuoteLinesDb).create(quote_line as any)
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
		quote_line: QuoteLine
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db
				.model(QuoteLinesDb)
				.update(quote_line as any, { where: { id: id } })
			if (result == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async delete(id: number): Promise<{ deleted: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db.model(QuoteLinesDb).destroy({ where: { id: id } })
			if (result == null) {
				return Promise.resolve({ deleted: false })
			}
			return Promise.resolve({ deleted: true })
		} catch (error) {
			return Promise.resolve({ deleted: false })
		}
	}
}
