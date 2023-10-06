import { QuoteAddon } from './QuotesAddons'
import { ResponseModel } from 'domain/responseModel'

export interface IQuotesAddOnsService {
	getAllbyQuoteID(quote_id: number): Promise<ResponseModel<QuoteAddon[]>>
	create(
		quote_id: number,
		quotes_addons: QuoteAddon[]
	): Promise<ResponseModel<{ created: boolean }>>
	upsert(
		quote_id: number,
		quotes_addons: QuoteAddon[]
	): Promise<ResponseModel<{ updated: boolean }>>
}
