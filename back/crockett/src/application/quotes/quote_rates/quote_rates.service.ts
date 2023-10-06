import {
	Injectable,
	Inject,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import {
	IQuoteRatesService,
	IQuoteRatesRepository,
	QuoteRate,
} from 'domain/quotes/quote_rates'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class QuoteRatesService implements IQuoteRatesService {
	constructor(
		@Inject('IQuoteRatesRepository')
		private readonly quoteRatesRepository: IQuoteRatesRepository
	) {}
	async getAllbyQuoteID(quote_id: number): Promise<ResponseModel<QuoteRate[]>> {
		const quote_rates = await this.quoteRatesRepository.getAllbyQuoteID(
			quote_id
		)

		if (!quote_rates) {
			throw new NotFoundException('Quote Rates not found')
		}
		return {
			code: 200,
			message: 'Quote Rates found',
			data: quote_rates,
		}
	}
	async create(
		quote_id: number,
		quotes_rates: QuoteRate[]
	): Promise<ResponseModel<{ created: boolean }>> {
		for (const iterator of quotes_rates) {
			delete iterator.id
			const quote_rate = await this.quoteRatesRepository.create({
				...iterator,
				quote_id,
			})
			if (!quote_rate) {
				throw new ConflictException('Quote Rate not created')
			}
		}
		return {
			code: 200,
			message: 'Quote Rates created',
			data: { created: true },
		}
	}
	async update(
		quote_id: number,
		quotes_rates: QuoteRate[]
	): Promise<ResponseModel<{ updated: boolean }>> {
		const quote_rate_db = await this.quoteRatesRepository.getAllbyQuoteID(
			quote_id
		)
		if (!quote_rate_db) {
			throw new NotFoundException('Quote Rates not found')
		}
		for (const iterator of quotes_rates) {
			if (iterator.id) {
				const quote_rate = await this.quoteRatesRepository.upsert(
					iterator.id,
					iterator
				)
				if (!quote_rate) {
					throw new ConflictException('Quote Rate not updated')
				}
			} else {
				const quote_rate = await this.quoteRatesRepository.create({
					...iterator,
					quote_id,
				})
				if (!quote_rate) {
					throw new ConflictException('Quote Rate not created')
				}
			}
		}
		return {
			code: 200,
			message: 'Quote Rates updated',
			data: { updated: true },
		}
	}
}
