import { QuoteAddon } from './QuotesAddons'

export interface IQuotesAddonsRepository {
	getAllbyQuoteID(quote_id: number): Promise<QuoteAddon[]>
	create(quotes_addon: QuoteAddon): Promise<{ created: boolean }>
	update(id: number, quotes_addon: QuoteAddon): Promise<{ updated: boolean }>
	delete(id: number): Promise<{ deleted: boolean }>
}
