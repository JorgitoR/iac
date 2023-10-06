export class AppFile {
	readonly id?: number
	readonly file_type: string | null
	readonly file_description: string | null
	readonly file_name: string | null
	readonly uploaded_by: string | null
	readonly link: string | null
	readonly corrective_actions?: string | null
	readonly job_id: number | null
	readonly visit_id?: number | null
	readonly asset_id?: number | null
	readonly vehicle_id?: number | null
	readonly tag_id?: number | null
	readonly notes?: string | null

	constructor(
		id: number,
		file_type: string | null,
		job_id: number | null,
		uploaded_by: string | null,
		link: string | null,
		visit_id: number | null,
		asset_id: number | null,
		vehicle_id: number | null,
		file_name: string | null,
		tag_id: number | null,
		corrective_actions: string | null,
		file_description: string | null,
		notes?: string | null
	) {
		this.id = id
		this.file_type = file_type
		this.job_id = job_id
		this.uploaded_by = uploaded_by
		this.link = link
		this.visit_id = visit_id
		this.asset_id = asset_id
		this.vehicle_id = vehicle_id
		this.file_name = file_name
		this.tag_id = tag_id
		this.corrective_actions = corrective_actions
		this.file_description = file_description
		this.notes=notes
	}
}
