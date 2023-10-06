export class Visits {
	readonly id?: number
	readonly date: string
	readonly job_id: number
	readonly team_leader_id: number
	readonly risk: string
	readonly type: string
	readonly swms_document: string
	readonly notes: string
	readonly comments: string
	readonly staff_ids: number[]
	readonly staff_labels: string[]
	readonly task_ids: number[]
	readonly task_labels: string[]
	readonly visit_status: string
	readonly status: string
	readonly time_on: string
	readonly time_off: string
	readonly vehicle_ids: number[]
	readonly vehicle_labels: string[]
	readonly start_time: string
	readonly job: number
	readonly team_leader: number

	constructor(
		id: number,
		date: string,
		job_id: number,
		team_leader_id: number,
		risk: string,
		type: string,
		swms_document: string,
		notes: string,
		comments: string,
		staff_ids: number[],
		staff_labels: string[],
		task_ids: number[],
		task_labels: string[],
		visit_status: string,
		status: string,
		time_on: string,
		time_off: string,
		vehicle_ids: number[],
		vehicle_labels: string[],
		start_time: string,
		job: number,
		team_leader: number
	) {
		this.id = id
		this.date = date
		this.job_id = job_id
		this.team_leader_id = team_leader_id
		this.risk = risk
		this.type = type
		this.swms_document = swms_document
		this.notes = notes
		this.comments = comments
		this.staff_ids = staff_ids
		this.staff_labels = staff_labels
		this.task_ids = task_ids
		this.task_labels = task_labels
		this.visit_status = visit_status
		this.status = status
		this.time_on = time_on
		this.time_off = time_off
		this.vehicle_ids = vehicle_ids
		this.vehicle_labels = vehicle_labels
		this.start_time = start_time
		this.job = job
		this.team_leader = team_leader
	}
}
