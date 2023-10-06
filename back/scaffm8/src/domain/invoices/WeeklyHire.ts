export class WeeklyHire {
	readonly id?: number
	readonly job_id: number
	readonly zone: string
	readonly zone_label: string
	readonly type: string
	readonly description: string
	readonly on_hire: string
	readonly completed: number
	readonly date_on_hire: string
	readonly days_on_hire: number
	readonly weekly_hire_rate: number
	readonly total: number
	readonly completed_date: string
	readonly handover_url: string
	readonly task_id: number
	readonly status: string
	readonly xeroReference: string
	constructor(
		id: number,
		job_id: number,
		zone: string,
		zone_label: string,
		type: string,
		description: string,
		on_hire: string,
		completed: number,
		date_on_hire: string,
		days_on_hire: number,
		weekly_hire_rate: number,
		total: number,
		completed_date: string,
		handover_url: string,
		task_id: number,
		status: string,
		xeroReference: string
	) {
		this.id = id
		this.job_id = job_id
		this.zone = zone
		this.zone_label = zone_label
		this.type = type
		this.description = description
		this.on_hire = on_hire
		this.completed = completed
		this.date_on_hire = date_on_hire
		this.days_on_hire = days_on_hire
		this.weekly_hire_rate = weekly_hire_rate
		this.total = total
		this.completed_date = completed_date
		this.handover_url = handover_url
		this.task_id = task_id
		this.status = status
		this.xeroReference = xeroReference
	}
}
