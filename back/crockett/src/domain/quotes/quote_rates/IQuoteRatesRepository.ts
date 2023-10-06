import { QuoteRate } from './QuoteRates'

export interface IQuoteRatesRepository {
	getAllbyQuoteID(quote_id: number): Promise<QuoteRate[]>
	create(quote_rate: QuoteRate): Promise<{ created: boolean }>
	upsert(id: number, quote_rate: QuoteRate): Promise<{ updated: boolean }>
}
