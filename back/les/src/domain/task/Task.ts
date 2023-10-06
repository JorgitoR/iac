export class Task {
	readonly id?: number
	readonly zone: string | null
	readonly zone_label: string | null
	readonly type: string | null
	readonly description: string | null
	readonly total_hours: string | null
	readonly job_id: number | null
	readonly task_type: string | null
	readonly quote_id: number | null
	readonly quote_num: string | null
	readonly complete: string
	readonly percentage_complete: number | null
	readonly handover_url: string | null
	readonly PO_Number: string | null
	readonly Requester: string | null
	readonly percentage_erect: number | null
	readonly percentage_dismantle: number | null
	readonly LastEditDate: string | null
	readonly created_by: string | null
	readonly hire_rate?: number | null
	readonly task_value?: number | null

	constructor(
		id: number,
		zone: string | null,
		zone_label: string | null,
		type: string | null,
		description: string | null,
		total_hours: string | null,
		job_id: number | null,
		task_type: string | null,
		quote_id: number | null,
		quote_num: string | null,
		complete: string,
		percentage_complete: number | null,
		handover_url: string | null,
		PO_Number: string | null,
		Requester: string | null,
		percentage_erect: number | null,
		percentage_dismantle: number | null,
		LastEditDate: string | null,
		created_by: string | null,
		hire_rate: number | null,
		task_value: number | null
	) {
		this.id = id
		this.zone = zone
		this.zone_label = zone_label
		this.type = type
		this.description = description
		this.total_hours = total_hours
		this.job_id = job_id
		this.task_type = task_type
		this.quote_id = quote_id
		this.quote_num = quote_num
		this.complete = complete
		this.percentage_complete = percentage_complete
		this.handover_url = handover_url
		this.PO_Number = PO_Number
		this.Requester = Requester
		this.percentage_erect = percentage_erect
		this.percentage_dismantle = percentage_dismantle
		this.LastEditDate = LastEditDate
		this.created_by = created_by
	}
}
