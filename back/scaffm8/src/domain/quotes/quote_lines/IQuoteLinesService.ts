import { QuoteLine } from './QuoteLines'
import { ResponseModel } from 'domain/responseModel'

export interface IQuoteLinesService {
	getAllbyQuoteID(quote_id: number): Promise<ResponseModel<QuoteLine[]>>
	create(
		quote_id: number,
		quote_lines: QuoteLine[]
	): Promise<ResponseModel<{ created: boolean }>>
	Upsert(
		id: number,
		quote_lines: QuoteLine[]
	): Promise<ResponseModel<{ updated: boolean }>>
}
