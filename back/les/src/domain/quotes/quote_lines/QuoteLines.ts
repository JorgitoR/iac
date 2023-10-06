export class QuoteLine {
	id?: number
	zone_id: number
	zone_label: string
	type: string
	description: string
	erect_and_dismantle: string
	total: string
	weekly_hire_fee: number
	quantity: number
	total_days: number
	percentage_weekly_hire_fee: number
	quote_id: number
	length: number
	height: number
	width: number
	total_dimensions: number

	constructor(
		id: number,
		zone_id: number,
		zone_label: string,
		type: string,
		description: string,
		erect_and_dismantle: string,
		total: string,
		weekly_hire_fee: number,
		quantity: number,
		total_days: number,
		percentage_weekly_hire_fee: number,
		quote_id: number,
		length: number,
		height: number,
		width: number,
		total_dimensions: number
	) {
		this.id = id
		this.zone_id = zone_id
		this.zone_label = zone_label
		this.type = type
		this.description = description
		this.erect_and_dismantle = erect_and_dismantle
		this.total = total
		this.weekly_hire_fee = weekly_hire_fee
		this.quantity = quantity
		this.total_days = total_days
		this.percentage_weekly_hire_fee = percentage_weekly_hire_fee
		this.quote_id = quote_id
		this.length = length
		this.height = height
		this.width = width
		this.total_dimensions = total_dimensions
	}
}
