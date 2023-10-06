export class Register {
	readonly job_id?: number
	readonly tag_no?: string
	readonly description?: string
	readonly last_inspection?: Date
	readonly inspection_due?: Date
	readonly created_at?: Date
	readonly status?: string
	readonly handover_doc?: string
	readonly uploaded_by?: string
	readonly task_id?: number

	constructor(
		job_id?: number,
		tag_no?: string,
		description?: string,
		last_inspection?: Date,
		inspection_due?: Date,
		created_at?: Date,
		status?: string,
		handover_doc?: string,
		uploaded_by?: string,
		task_id?: number
	) {
		this.job_id = job_id
		this.tag_no = tag_no
		this.description = description
		this.last_inspection = last_inspection
		this.inspection_due = inspection_due
		this.created_at = created_at
		this.status = status
		this.handover_doc = handover_doc
		this.uploaded_by = uploaded_by
		this.task_id = task_id
	}
}
