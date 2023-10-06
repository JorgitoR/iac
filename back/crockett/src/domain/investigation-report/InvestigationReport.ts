export class InvestigationReport {
	readonly id: number
	readonly assignedTo: number
	readonly dateRequired: string
	readonly note: string
	readonly completed: string
	readonly dateCompleted: string
	readonly file: string
	readonly createdBy: string
	readonly followUpFile: string
	readonly address: string
	readonly type: string
	readonly actionRequired: string

	constructor(
		id: number,
		assignedTo: number,
		dateRequired: string,
		note: string,
		completed: string,
		dateCompleted: string,
		file: string,
		createdBy: string,
		followUpFile: string,
		address: string,
		type: string,
		actionRequired: string
	) {
		this.id = id
		this.assignedTo = assignedTo
		this.dateRequired = dateRequired
		this.note = note
		this.completed = completed
		this.dateCompleted = dateCompleted
		this.file = file
		this.createdBy = createdBy
		this.followUpFile = followUpFile
		this.address = address
		this.type = type
		this.actionRequired = actionRequired
	}
}
