import { Injectable, Inject } from '@nestjs/common'
import { IQuotesAddonsRepository, QuoteAddon } from 'domain/quotes/quote_addons'
import { PostgresAdapter, QuoteAddons as QuoteAddonsDb } from 'infra/database'

@Injectable()
export class QuoteAddonsDtb implements IQuotesAddonsRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAllbyQuoteID(quote_id: number): Promise<QuoteAddon[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(QuoteAddonsDb).findAll({
				where: { quote_id: quote_id },
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			})
			if (data == null) {
				return []
			}
			const dataResult = data.map((item) => item.toJSON() as QuoteAddon)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async create(quotes_addon: QuoteAddon): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db.model(QuoteAddonsDb).create(quotes_addon as any)
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
		quotes_addon: QuoteAddon
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db
				.model(QuoteAddonsDb)
				.update(quotes_addon as any, { where: { id: id } })
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
			const result = await db
				.model(QuoteAddonsDb)
				.destroy({ where: { id: id } })
			if (result == null) {
				return Promise.resolve({ deleted: false })
			}
			return Promise.resolve({ deleted: true })
		} catch (error) {
			return Promise.resolve({ deleted: false })
		}
	}
}
