import { Quote } from './Quote'

export interface IQuotesRepository {
	getAll(): Promise<Quote[]>
	getById(id: number): Promise<Quote>
	getAllMajorThatDays(days: number): Promise<Quote[]>
	create(quote: Quote): Promise<{ created: boolean; quote_id: number }>
	update(id: number, quote: Quote): Promise<{ updated: boolean }>
	sendEmail(from, subject, body): Promise<{ sent: boolean }>
}
