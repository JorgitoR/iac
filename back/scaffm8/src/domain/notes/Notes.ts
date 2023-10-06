export class Notes {
	readonly id?: number
	readonly fileName: string
	readonly fileType: string
	readonly fileUrl: string
	readonly notes: string | null
	readonly job_id: number | null
	readonly client_id: number | null
	readonly staff_id: number | null
	readonly asset_id: number | null
	readonly vehicle_id: number | null
	readonly fileDescription: string | null
	readonly createdDate: string | null

	constructor(
		id: number,
		notes: string | null,
		job_id: number | null,
		client_id: number | null,
		staff_id: number | null,
		asset_id: number | null,
		vehicle_id: number | null,
		fileDescription: string | null,
		createdDate: string | null
	) {
		this.id = id
		this.notes = notes
		this.job_id = job_id
		this.client_id = client_id
		this.staff_id = staff_id
		this.asset_id = asset_id
		this.vehicle_id = vehicle_id
		this.fileDescription = fileDescription
		this.createdDate = createdDate
	}
}
