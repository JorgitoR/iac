import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import {
	IQuotesService,
	IQuotesRepository,
	Quote,
} from 'domain/quotes/quote_general'
import { IQuoteLinesRepository } from 'domain/quotes/quote_lines'

import { IJobsRepository } from 'domain/jobs'
import { ITaskRepository } from 'domain/task'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class QuotesGeneralService implements IQuotesService {
	constructor(
		@Inject('IQuotesRepository')
		private readonly quotesRepository: IQuotesRepository,
		@Inject('IQuoteLinesRepository')
		private readonly quoteLinesRepository: IQuoteLinesRepository
	) {}
	async getAll(): Promise<ResponseModel<Quote[]>> {
		try {
			const quotes = await this.quotesRepository.getAll()
			return {
				code: 200,
				message: 'Quotes found',
				data: quotes,
			}
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}
	async getById(id: number): Promise<ResponseModel<Quote>> {
		try {
			const quote = await this.quotesRepository.getById(id)
			if (!quote) {
				throw new NotFoundException({
					code: 404,
					message: 'Quote not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Quote found',
				data: quote,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async create(
		quote: Quote
	): Promise<ResponseModel<{ created: boolean; quote_id: number }>> {
		try {
			const resultQuote = await this.quotesRepository.create(quote)
			if (!resultQuote.created) {
				throw new ConflictException({
					code: 500,
					message: 'Quote not created',
					data: null,
				})
			}
			const quoteData = await this.quotesRepository.getById(
				resultQuote.quote_id
			)
			let quote_num = ''
			if (quoteData.quote_type === 'New') {
				quote_num = `${resultQuote.quote_id + 1000} - 1`
			} else if (quoteData.quote_type === 'Variation') {
				quote_num = `${resultQuote.quote_id + 1000} - V1`
			}

			await this.quotesRepository.update(resultQuote.quote_id, {
				...quoteData,
				quote_num,
			})

			return {
				code: 200,
				message: 'Quote created',
				data: { created: true, quote_id: resultQuote.quote_id },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async update(
		id: number,
		quote: Quote
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const resultQuote = await this.quotesRepository.update(id, quote)
			if (!resultQuote.updated) {
				throw new ConflictException({
					code: 500,
					message: 'Quote not updated',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Quote updated',
				data: { updated: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async markAsSent(
		id: number,
		emailData: {
			subject: string
			email: string
			body: string
			quoteId: number
		}
	): Promise<ResponseModel<{ updated: boolean }>> {
		const emailResult = await this.quotesRepository.sendEmail(
			emailData.email,
			emailData.subject,
			emailData.body
		)

		if (!emailResult.sent) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Email not Send',
				data: null,
			})
		}
		try {
			const quote = await this.quotesRepository.getById(id)
			const resultQuote = await this.quotesRepository.update(id, {
				...quote,
				emailStatus: 'Sent',
			})
			if (!resultQuote.updated) {
				throw new ConflictException({
					code: 500,
					message: 'Quote not updated',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Quote updated',
				data: { updated: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}
	async markReadyToSent(
		id: number
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const quote = await this.quotesRepository.getById(id)
			const resultQuote = await this.quotesRepository.update(id, {
				...quote,
				emailStatus: 'Ready to Send',
			})
			if (!resultQuote.updated) {
				throw new ConflictException({
					code: 500,
					message: 'Quote not updated',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Quote updated',
				data: { updated: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}

	async reject(id: number): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const quote = await this.quotesRepository.getById(id)
			const resultQuote = await this.quotesRepository.update(id, {
				...quote,
				status: 'Declined',
			})
			if (!resultQuote.updated) {
				throw new ConflictException({
					code: 500,
					message: 'Quote not updated',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Quote updated',
				data: { updated: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_1AM)
	async autoDecline(): Promise<void> {
		try {
			const quotes = await this.quotesRepository.getAllMajorThatDays(90)

			for (const quote of quotes) {
				await this.quotesRepository.update(quote.id, {
					...quote,
					status: 'Declined',
				})
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: error,
			})
		}
		return
	}
}
