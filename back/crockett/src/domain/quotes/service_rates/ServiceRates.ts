export class ServiceRate {
	readonly id?: number
	readonly service: string
	readonly fee: number
	readonly type: string

	constructor(id: number, service: string, fee: number, type: string) {
		this.id = id
		this.service = service
		this.fee = fee
		this.type = type
	}
}
