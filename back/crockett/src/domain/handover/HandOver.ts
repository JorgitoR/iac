export class HandOver {
	readonly id?: number
	readonly job_id: number | null
	readonly billing_address: string | null
	readonly credit_check: string | null
	readonly work_safe: string | null
	readonly sssp_added: string | null
	readonly hs_officer_phone: string | null
	readonly hs_officer_email: string | null
	readonly site_forman_email: string | null
	readonly site_forman_phone: string | null
	readonly gear_shortages: string | null
	readonly allowed_quote: string | null
	readonly engaged_engineer: string | null
	readonly staff_availability: string | null
	readonly booked_shrinkwrappers: string | null
	readonly credit_check_who: string | null
	readonly credit_check_when: string | null
	readonly swms_added: string | null
	readonly worksafe_uploaded: string | null
	readonly worksafe_uploaded_when: string | null
	readonly hs_officer: string | null
	readonly site_forman: string | null
	readonly invoiceType: string | null
	readonly hs_officer_client: string | null
	readonly hs_officer_client_number: string | null
	readonly hs_officer_client_email: string | null
	readonly site_forman2: string | null
	readonly site_forman_phone2: string | null
	readonly site_forman_email2: string | null
	readonly operation_assignee: number | null

	constructor(
		id: number,
		job_id: number | null,
		billing_address: string | null,
		credit_check: string | null,
		work_safe: string | null,
		sssp_added: string | null,
		hs_officer_phone: string | null,
		hs_officer_email: string | null,
		site_forman_email: string | null,
		site_forman_phone: string | null,
		gear_shortages: string | null,
		allowed_quote: string | null,
		engaged_engineer: string | null,
		staff_availability: string | null,
		booked_shrinkwrappers: string | null,
		credit_check_who: string | null,
		credit_check_when: string | null,
		swms_added: string | null,
		worksafe_uploaded: string | null,
		worksafe_uploaded_when: string | null,
		hs_officer: string | null,
		site_forman: string | null,
		invoiceType: string | null,
		hs_officer_client: string | null,
		hs_officer_client_number: string | null,
		hs_officer_client_email: string | null,
		site_forman2: string | null,
		site_forman_phone2: string | null,
		site_forman_email2: string | null,
		operation_assignee: number | null
	) {
		this.id = id
		this.job_id = job_id
		this.billing_address = billing_address
		this.credit_check = credit_check
		this.work_safe = work_safe
		this.sssp_added = sssp_added
		this.hs_officer_phone = hs_officer_phone
		this.hs_officer_email = hs_officer_email
		this.site_forman_email = site_forman_email
		this.site_forman_phone = site_forman_phone
		this.gear_shortages = gear_shortages
		this.allowed_quote = allowed_quote
		this.engaged_engineer = engaged_engineer
		this.staff_availability = staff_availability
		this.booked_shrinkwrappers = booked_shrinkwrappers
		this.credit_check_who = credit_check_who
		this.credit_check_when = credit_check_when
		this.swms_added = swms_added
		this.worksafe_uploaded = worksafe_uploaded
		this.worksafe_uploaded_when = worksafe_uploaded_when
		this.hs_officer = hs_officer
		this.site_forman = site_forman
		this.invoiceType = invoiceType
		this.hs_officer_client = hs_officer_client
		this.hs_officer_client_number = hs_officer_client_number
		this.hs_officer_client_email = hs_officer_client_email
		this.site_forman2 = site_forman2
		this.site_forman_phone2 = site_forman_phone2
		this.site_forman_email2 = site_forman_email2
		this.operation_assignee = operation_assignee
	}
}
