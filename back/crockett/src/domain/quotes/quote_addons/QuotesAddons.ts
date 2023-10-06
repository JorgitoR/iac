export class QuoteAddon {
	readonly id?: number
	readonly type: string
	readonly description: string
	readonly duration_quantity: number
	readonly hire_fee: number
	readonly fixed_charge: number
	readonly total_cost: number
	readonly quote_id: number

	constructor(
		id: number,
		type: string,
		description: string,
		duration_quantity: number,
		hire_fee: number,
		fixed_charge: number,
		total_cost: number,
		quote_id: number
	) {
		this.id = id
		this.type = type
		this.description = description
		this.duration_quantity = duration_quantity
		this.hire_fee = hire_fee
		this.fixed_charge = fixed_charge
		this.total_cost = total_cost
		this.quote_id = quote_id
	}
}
