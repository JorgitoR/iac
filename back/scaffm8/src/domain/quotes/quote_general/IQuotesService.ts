import { Quote } from './Quote'
import { ResponseModel } from 'domain/responseModel'

export interface IQuotesService {
	getAll(): Promise<ResponseModel<Quote[]>>
	getById(id: number): Promise<ResponseModel<Quote>>
	create(
		quote: Quote
	): Promise<ResponseModel<{ created: boolean; quote_id: number }>>
	update(id: number, quote: Quote): Promise<ResponseModel<{ updated: boolean }>>
	markAsSent(
		id: number,
		emailData: {
			subject: string
			email: string
			body: string
			quoteId: number
		}
	): Promise<ResponseModel<{ updated: boolean }>>
	markReadyToSent(id: number): Promise<ResponseModel<{ updated: boolean }>>
	reject(id: number): Promise<ResponseModel<{ updated: boolean }>>
}
