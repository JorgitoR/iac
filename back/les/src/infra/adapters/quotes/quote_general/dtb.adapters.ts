import * as moment from 'moment'
import { Op, Sequelize } from 'sequelize'
import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IQuotesRepository, Quote } from 'domain/quotes/quote_general'
import { PostgresAdapter, Quotes as QuotesDb } from 'infra/database'
import { SmtpAdapter } from 'infra/smtp'

@Injectable()
export class QuoteGeneralDtb implements IQuotesRepository {
	constructor(
		@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter,
		@Inject(SmtpAdapter) private readonly smtp: SmtpAdapter,
		private readonly configService: ConfigService
	) {}
	async getAll(): Promise<Quote[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(QuotesDb).findAll({
				include: [
					{
						model: db.model('Client'),
						as: 'clientData',
					},
					{
						model: db.model('ClientContact'),
						as: 'contactData',
					},
					{
						model: db.model('Staff'),
						as: 'estimatorData',
					},
				],
			})
			if (data == null) {
				return Promise.resolve([])
			}
			const dataResult = data.map((item) => item.toJSON() as Quote)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Quote> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(QuotesDb).findOne({
				where: { id: id },
				include: [
					{
						model: db.model('Client'),
						as: 'clientData',
					},
					{
						model: db.model('ClientContact'),
						as: 'contactData',
					},
					{
						model: db.model('Staff'),
						as: 'estimatorData',
					},
				],
			})
			if (data == null) {
				return Promise.resolve(null)
			}
			const dataResult = data.toJSON() as Quote

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllMajorThatDays(days: number): Promise<Quote[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const quotes = await db.model(QuotesDb).findAll({
				where: {
					status: 'Pending',
				},
			})
			if (quotes == null) {
				return Promise.resolve([])
			}

			const today = moment()

			const result = []

			for (const iterator of quotes) {
				const date = moment(iterator.updatedAt)
				const daysDiff = moment(today).diff(date, 'days')

				if (daysDiff >= days) {
					result.push(iterator)
				}
			}

			const dataResult = result.map((item) => item.dataValues as Quote)
			return Promise.resolve(dataResult)
		} catch (error) {
			Promise.resolve([])
		}
	}
	async create(quote: Quote): Promise<{ created: boolean; quote_id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db.model(QuotesDb).create(quote as any)
			if (result == null) {
				return Promise.resolve({ created: false, quote_id: null })
			}
			return Promise.resolve({ created: true, quote_id: result.id })
		} catch (error) {
			return Promise.resolve({ created: false, quote_id: null })
		}
	}
	async update(id: number, quote: Quote): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const result = await db
				.model(QuotesDb)
				.update(quote as any, { where: { id: id } })
			if (result == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async sendEmail(
		to: string,
		subject: string,
		body: string
	): Promise<{ sent: boolean }> {
		try {
			const result = await this.smtp.sendMail(to, subject, body)
			if (result == null) {
				return Promise.resolve({ sent: false })
			}
			return Promise.resolve({ sent: true })
		} catch (error) {
			return Promise.resolve({ sent: false })
		}
	}
}
