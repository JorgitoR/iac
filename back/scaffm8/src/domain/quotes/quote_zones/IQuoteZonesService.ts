import { QuoteZone } from './QuoteZones'
import { ResponseModel } from 'domain/responseModel'

export interface IQuoteZonesService {
	getAllbyQuoteID(quote_id: number): Promise<ResponseModel<QuoteZone[]>>
	create(
		quote_id: number,
		quote_zones: QuoteZone[]
	): Promise<ResponseModel<{ created: boolean }>>
	update(
		quote_id: number,
		quote_zones: QuoteZone[]
	): Promise<ResponseModel<{ updated: boolean }>>
}
