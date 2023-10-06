import { QuoteZone } from './QuoteZones'

export interface IQuoteZonesRepository {
	getAllbyQuoteID(quote_id: number): Promise<QuoteZone[]>
	create(quote_zone: QuoteZone): Promise<{ created: boolean }>
	update(id: number, quote_zone: QuoteZone): Promise<{ updated: boolean }>
}
