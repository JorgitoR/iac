export class Timesheet {
	readonly id?: number
	readonly date?: string
	readonly job_id?: number
	readonly time_on?: string
	readonly time_off?: string
	readonly hours?: number
	readonly comments?: string
	readonly status?: string
	readonly staff_id?: number
	readonly timesheet_id?: string
	readonly approved_by?: string
	readonly actual_finish?: string
	readonly exported?: string
	readonly visitTimeSheetId?: string

	constructor(
		id: number,
		date: string,
		job_id: number,
		time_on: string,
		time_off: string,
		hours: number,
		comments: string,
		status: string,
		staff_id: number,
		timesheet_id: string,
		approved_by: string,
		actual_finish: string,
		exported: string,
		visitTimeSheetId: string
	) {
		this.id = id
		this.date = date
		this.job_id = job_id
		this.time_on = time_on
		this.time_off = time_off
		this.hours = hours
		this.comments = comments
		this.status = status
		this.staff_id = staff_id
		this.timesheet_id = timesheet_id
		this.approved_by = approved_by
		this.actual_finish = actual_finish
		this.exported = exported
		this.visitTimeSheetId = visitTimeSheetId
	}
}
