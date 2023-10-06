export class QuoteZone {
	readonly id?: number
	readonly zone_id: string
	readonly zone_label: string
	readonly quote_id: number

	constructor(
		id: number,
		zone_id: string,
		zone_label: string,
		quote_id: number
	) {
		this.id = id
		this.zone_id = zone_id
		this.zone_label = zone_label
		this.quote_id = quote_id
	}
}
