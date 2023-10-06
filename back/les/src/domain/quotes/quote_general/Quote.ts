export class Quote {
	readonly id?: number
	readonly job_type: string
	readonly quote_num: string
	readonly street: string
	readonly street2: string
	readonly city: string
	readonly status: string
	readonly created_at: Date
	readonly updated_at: Date
	readonly max_zones: number
	readonly scope_of_work: string
	readonly postal: string
	readonly weekTotal: number
	readonly total: number
	readonly terms: string
	readonly client_contact: number
	readonly estimator: number
	readonly approved_by: string
	readonly approveComment: string
	readonly variation_job_id: number
	readonly quote_type: string
	readonly PO_Number: string
	readonly estimatedWay: string
	readonly additionalTotal: number
	readonly erectDismantleTotal: number
	readonly emailStatus: string
	readonly longitude: number
	readonly latitude: number
	readonly fullAddress: string
	readonly client: number

	constructor(
		id: number,
		job_type: string,
		quote_num: string,
		street: string,
		street2: string,
		city: string,
		status: string,
		created_at: Date,
		updated_at: Date,
		max_zones: number,
		scope_of_work: string,
		postal: string,
		weekTotal: number,
		total: number,
		terms: string,
		client_contact: number,
		estimator: number,
		approved_by: string,
		approveComment: string,
		variation_job_id: number,
		quote_type: string,
		PO_Number: string,
		estimatedWay: string,
		additionalTotal: number,
		erectDismantleTotal: number,
		emailStatus: string,
		longitude: number,
		latitude: number,
		fullAddress: string,
		client: number
	) {
		this.id = id
		this.job_type = job_type
		this.quote_num = quote_num
		this.street = street
		this.street2 = street2
		this.city = city
		this.status = status
		this.created_at = created_at
		this.updated_at = updated_at
		this.max_zones = max_zones
		this.scope_of_work = scope_of_work
		this.postal = postal
		this.weekTotal = weekTotal
		this.total = total
		this.terms = terms
		this.client_contact = client_contact
		this.estimator = estimator
		this.approved_by = approved_by
		this.approveComment = approveComment
		this.variation_job_id = variation_job_id
		this.quote_type = quote_type
		this.PO_Number = PO_Number
		this.estimatedWay = estimatedWay
		this.additionalTotal = additionalTotal
		this.erectDismantleTotal = erectDismantleTotal
		this.emailStatus = emailStatus
		this.longitude = longitude
		this.latitude = latitude
		this.fullAddress = fullAddress
		this.client = client
	}
}
