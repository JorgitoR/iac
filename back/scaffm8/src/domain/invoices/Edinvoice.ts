export class Edinvoice {
	readonly id?: number
	readonly zone: string
	readonly zone_label: string
	readonly type: string
	readonly description: string
	readonly erect_percent: number
	readonly erect: number
	readonly dismantle_percent: number
	readonly dismantle: number
	readonly total: number
	readonly complete_percent: number
	readonly last_time_updated: Date
	readonly status: string
	readonly job_id: number
	readonly task_id: number
	readonly PO_Number: string
	readonly Quote_Number: string
	readonly xeroReference: string

	constructor(
		id: number,
		zone: string,
		zone_label: string,
		type: string,
		description: string,
		erect_percent: number,
		erect: number,
		dismantle_percent: number,
		dismantle: number,
		total: number,
		complete_percent: number,
		last_time_updated: Date,
		status: string,
		task_id: number,
		job_id: number,
		PO_Number: string,
		Quote_Number: string,
		xeroReference: string
	) {
		this.id = id
		this.zone = zone
		this.zone_label = zone_label
		this.type = type
		this.description = description
		this.erect_percent = erect_percent
		this.erect = erect
		this.dismantle_percent = dismantle_percent
		this.dismantle = dismantle
		this.total = total
		this.complete_percent = complete_percent
		this.last_time_updated = last_time_updated
		this.status = status
		this.task_id = task_id
		this.job_id = job_id
		this.PO_Number = PO_Number
		this.Quote_Number = Quote_Number
		this.xeroReference = xeroReference
	}
}
