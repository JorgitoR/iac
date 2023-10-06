export class VisitTimesheet {
	readonly id?: number
	readonly job_id: number
	readonly visit_id: number
	readonly supervisor_id: number
	readonly staff_labels: object
	readonly staff_ids: object
	readonly time_in: string
	readonly time_off: string
	readonly status: string

	constructor(
		id: number,
		job_id: number,
		visit_id: number,
		supervisor_id: number,
		staff_labels: object,
		staff_ids: object,
		time_in: string,
		time_off: string,
		status: string
	) {
		this.id = id
		this.job_id = job_id
		this.visit_id = visit_id
		this.supervisor_id = supervisor_id
		this.staff_labels = staff_labels
		this.staff_ids = staff_ids
		this.time_in = time_in
		this.time_off = time_off
		this.status = status
	}
}
