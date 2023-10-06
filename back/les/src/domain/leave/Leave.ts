export class Leave {
	readonly id?: number
	readonly staffId: number
	readonly type: string | null
	readonly startDate: string | null
	readonly endDate: string | null
	readonly comments: string | null
	readonly totalDays: number | null
	readonly status: string | null
	readonly approvedBy: string | null

	constructor(
		id: number,
		staffId: number,
		type: string | null,
		startDate: string | null,
		endDate: string | null,
		comments: string | null,
		totalDays: number | null,
		status: string | null,
		approvedBy: string | null
	) {
		this.id = id
		this.staffId = staffId
		this.type = type
		this.startDate = startDate
		this.endDate = endDate
		this.comments = comments
		this.totalDays = totalDays
		this.status = status
		this.approvedBy = approvedBy
	}
}
