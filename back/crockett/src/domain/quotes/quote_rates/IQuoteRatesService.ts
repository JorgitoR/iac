import { QuoteRate } from './QuoteRates'
import { ResponseModel } from 'domain/responseModel'

export interface IQuoteRatesService {
	getAllbyQuoteID(quote_id: number): Promise<ResponseModel<QuoteRate[]>>
	create(
		quote_id: number,
		quote_rates: QuoteRate[]
	): Promise<ResponseModel<{ created: boolean }>>
	update(
		id: number,
		quote_rates: QuoteRate[]
	): Promise<ResponseModel<{ updated: boolean }>>
}
