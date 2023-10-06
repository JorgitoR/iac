export class QuoteRate {
	id?: number
	service: string
	type: string
	fee: number
	quote_id: number

	constructor(
		id: number,
		service: string,
		type: string,
		fee: number,
		quote_id: number
	) {
		this.id = id
		this.service = service
		this.type = type
		this.fee = fee
		this.quote_id = quote_id
	}
}
