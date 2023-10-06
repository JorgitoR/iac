export class Job {
	readonly id?: number
	readonly job_num: string
	readonly job_type: string
	readonly client_id: number
	readonly start_date: Date
	readonly end_date: Date
	readonly status: string
	readonly site: string
	readonly job_status: string
	readonly supervisor: number
	readonly branding: string
	readonly quote_id: number
	readonly on_hire: string
	readonly descriptionOfQuote: string
	readonly notes: string
	readonly latitude: number
	readonly longitude: number

	constructor(
		id: number,
		job_num: string,
		job_type: string,
		client_id: number,
		start_date: Date,
		end_date: Date,
		status: string,
		site: string,
		job_status: string,
		supervisor: number,
		branding: string,
		quote_id: number,
		on_hire: string,
		descriptionOfQuote: string,
		notes: string,
		latitude: number,
		longitude: number
	) {
		this.id = id
		this.job_num = job_num
		this.job_type = job_type
		this.client_id = client_id
		this.start_date = start_date
		this.end_date = end_date
		this.status = status

		this.site = site
		this.job_status = job_status
		this.supervisor = supervisor
		this.branding = branding
		this.quote_id = quote_id
		this.on_hire = on_hire
		this.descriptionOfQuote = descriptionOfQuote
		this.notes = notes
		this.latitude = latitude
		this.longitude = longitude
	}
}
