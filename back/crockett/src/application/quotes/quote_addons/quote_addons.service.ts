import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import {
	IQuotesAddOnsService,
	IQuotesAddonsRepository,
	QuoteAddon,
} from 'domain/quotes/quote_addons'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class QuotesAddonsService implements IQuotesAddOnsService {
	constructor(
		@Inject('IQuotesAddonsRepository')
		private readonly quotesAddonsRepository: IQuotesAddonsRepository
	) {}
	async getAllbyQuoteID(
		quote_id: number
	): Promise<ResponseModel<QuoteAddon[]>> {
		const quote_addons = await this.quotesAddonsRepository.getAllbyQuoteID(
			quote_id
		)

		if (!quote_addons) {
			throw new NotFoundException('Quote Additional Items not found')
		}
		return {
			code: 200,
			message: 'Quote Additional Items found',
			data: quote_addons,
		}
	}
	async create(
		quote_id: number,
		quotes_addons: QuoteAddon[]
	): Promise<ResponseModel<{ created: boolean }>> {
		for (const iterator of quotes_addons) {
			const quote_addon = await this.quotesAddonsRepository.create({
				...iterator,
				quote_id,
			})
			if (!quote_addon) {
				throw new ConflictException('Quote Additional Item not created')
			}
		}
		return {
			code: 200,
			message: 'Quote Additional Items created',
			data: { created: true },
		}
	}
	async upsert(
		quote_id: number,
		quotes_addons: QuoteAddon[]
	): Promise<ResponseModel<{ updated: boolean }>> {
		const quote_addon_db = await this.quotesAddonsRepository.getAllbyQuoteID(
			quote_id
		)
		if (!quote_addon_db) {
			throw new ConflictException({
				code: 500,
				message: 'Quote Additional Item not updated',
				data: { updated: false },
			})
		}
		for (const iterator of quotes_addons) {
			if (iterator.id) {
				const quote_addon = await this.quotesAddonsRepository.update(
					iterator.id,
					iterator
				)
				if (!quote_addon) {
					throw new ConflictException({
						code: 500,
						message: 'Quote Additional Item not updated',
						data: { updated: false },
					})
				}
			} else {
				const quote_addon = await this.quotesAddonsRepository.create({
					...iterator,
					quote_id,
				})
				if (!quote_addon) {
					throw new ConflictException({
						code: 500,
						message: 'Quote Additional Item not updated',
						data: { updated: false },
					})
				}
			}
		}
		if (quote_addon_db.length !== quotes_addons.length) {
			for (const iterator of quote_addon_db) {
				const quote_addon = quotes_addons.find(
					(item) => item.id === iterator.id
				)
				if (!quote_addon) {
					const quote_addon = await this.quotesAddonsRepository.delete(
						iterator.id
					)
					if (!quote_addon) {
						throw new ConflictException({
							code: 500,
							message: 'Quote Additional Item not deleted',
							data: { updated: false },
						})
					}
				}
			}
		}
		return {
			code: 200,
			message: 'Quote Additional Items updated',
			data: { updated: true },
		}
	}
}
