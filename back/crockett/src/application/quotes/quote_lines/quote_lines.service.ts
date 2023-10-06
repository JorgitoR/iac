import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import {
	IQuoteLinesService,
	IQuoteLinesRepository,
	QuoteLine,
} from 'domain/quotes/quote_lines'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class QuoteLinesService implements IQuoteLinesService {
	constructor(
		@Inject('IQuoteLinesRepository')
		private readonly quoteLinesRepository: IQuoteLinesRepository
	) {}
	async getAllbyQuoteID(quote_id: number): Promise<ResponseModel<QuoteLine[]>> {
		const quote_lines = await this.quoteLinesRepository.getAllByQuoteID(
			quote_id
		)

		if (!quote_lines) {
			throw new NotFoundException('Quote Lines not found')
		}
		return {
			code: 200,
			message: 'Quote Lines found',
			data: quote_lines,
		}
	}
	async create(
		quote_id: number,
		quotes_lines: QuoteLine[]
	): Promise<ResponseModel<{ created: boolean }>> {
		for (const iterator of quotes_lines) {
			const quote_line = await this.quoteLinesRepository.create({
				...iterator,
				quote_id,
			})
			if (!quote_line) {
				throw new ConflictException('Quote Line not created')
			}
		}
		return {
			code: 200,
			message: 'Quote Lines created',
			data: { created: true },
		}
	}
	async Upsert(
		quote_id: number,
		quotes_lines: QuoteLine[]
	): Promise<ResponseModel<{ updated: boolean }>> {
		const db_quote_lines = await this.quoteLinesRepository.getAllByQuoteID(
			quote_id
		)
		if (!db_quote_lines) {
			throw new NotFoundException({
				code: 404,
				message: 'Quote Lines not found',
				data: { updated: false },
			})
		}
		for (const iterator of quotes_lines) {
			if (iterator.id) {
				const quote_line = await this.quoteLinesRepository.update(
					iterator.id,
					iterator
				)
				if (!quote_line) {
					throw new ConflictException({
						code: 409,
						message: 'Quote Line not updated',
						data: null,
					})
				}
			} else {
				const quote_line = await this.quoteLinesRepository.create({
					...iterator,
					quote_id: quote_id,
				})
				if (!quote_line) {
					throw new ConflictException({
						code: 409,
						message: 'Quote Line not created',
						data: null,
					})
				}
			}
		}
		const new_quote_lines = await this.quoteLinesRepository.getAllByQuoteID(
			quote_id
		)
		if (new_quote_lines.length !== quotes_lines.length) {
			for (const iterator of new_quote_lines) {
				const quote_line = quotes_lines.find(
					(quote_line) => quote_line.id === iterator.id
				)
				if (!quote_line) {
					const deleted = await this.quoteLinesRepository.delete(iterator.id)
					if (!deleted) {
						throw new ConflictException({
							code: 409,
							message: 'Quote Line not deleted',
							data: { updated: false },
						})
					}
				}
			}
			return {
				code: 200,
				message: 'Quote Lines updated',
				data: { updated: true },
			}
		}
		return {
			code: 200,
			message: 'Quote Lines updated',
			data: { updated: true },
		}
	}
}
