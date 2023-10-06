import { QuoteLine } from './QuoteLines'

export interface IQuoteLinesRepository {
	getAllByQuoteID(quote_id: number): Promise<QuoteLine[]>
	create(quote_line: QuoteLine): Promise<{ created: boolean }>
	update(id: number, quote_line: QuoteLine): Promise<{ updated: boolean }>
	delete(id: number): Promise<{ deleted: boolean }>
}
