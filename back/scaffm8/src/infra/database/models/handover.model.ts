import { Model, Column, Table, ForeignKey } from 'sequelize-typescript'
import { Jobs } from './jobs.model'
import { Staff } from './staff.model'

@Table({ tableName: 'handover' })
export class Handover extends Model<Handover> {
	@Column({ primaryKey: true, autoIncrement: true })
	id!: number

	@ForeignKey(() => Jobs)
	@Column({
		field: 'job_id',
		allowNull: false,
		references: {
			model: Jobs,
			key: 'id',
		},
	})
	job_id!: number

	@Column
	billing_address!: string | null

	@Column
	credit_check!: string | null

	@Column
	work_safe!: string | null

	@Column
	sssp_added!: string | null

	@Column
	hs_officer_phone!: string | null

	@Column
	hs_officer_email!: string | null

	@Column
	site_forman_email!: string | null

	@Column
	site_forman_phone!: string | null

	@Column
	gear_shortages!: string | null

	@Column
	allowed_quote!: string | null

	@Column
	engaged_engineer!: string | null

	@Column
	staff_availability!: string | null

	@Column
	booked_shrinkwrappers!: string | null

	@Column
	credit_check_who!: string | null

	@Column
	credit_check_when!: string | null

	@Column
	swms_added!: string | null

	@Column
	worksafe_uploaded!: string | null

	@Column
	worksafe_uploaded_when!: string | null

	@Column
	hs_officer!: string | null

	@Column
	site_forman!: string | null

	@Column({ field: 'invoiceType' })
	invoiceType!: string | null

	@Column
	hs_officer_client!: string | null

	@Column
	hs_officer_client_number!: string | null

	@Column
	hs_officer_client_email!: string | null

	@Column
	site_forman2!: string | null

	@Column
	site_forman_phone2!: string | null

	@Column
	site_forman_email2!: string | null

	@ForeignKey(() => Staff)
	@Column({
		field: 'operation_assignee',
		allowNull: true,
		references: {
			model: Staff,
			key: 'id',
		},
	})
	operation_assignee!: number
}
