import {
	Column,
	Model,
	Table,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript'
import { Client } from './clients.model'
import { ClientContact } from './client_contacts.model'
import { Staff } from './staff.model'
import { DataTypes } from 'sequelize'
import { Jobs } from './jobs.model'

@Table({ tableName: 'quotes' })
export class Quotes extends Model<Quotes> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		allowNull: false,
	})
	id: number

	@Column
	job_type: string

	@Column
	quote_num: string

	@Column
	street: string

	@Column
	street2: string

	@Column
	city: string

	@Column({
		allowNull: false,
		defaultValue: 'Pending',
	})
	status: string

	@Column
	max_zones: number

	@Column
	scope_of_work: string

	@Column
	postal: string

	@Column(DataTypes.FLOAT)
	weekTotal: number

	@Column(DataTypes.FLOAT)
	total: number

	@Column
	terms: string

	@ForeignKey(() => ClientContact)
	@Column
	client_contact: number

	@BelongsTo(() => ClientContact)
	contactData: ClientContact

	@ForeignKey(() => Staff)
	@Column
	estimator: number

	@BelongsTo(() => Staff)
	estimatorData: Staff

	@Column
	approved_by: string

	@Column
	approveComment: string

	@ForeignKey(() => Jobs)
	@Column
	variation_job_id: number

	@Column
	quote_type: string

	@Column
	PO_Number: string

	@Column
	estimatedWay: string

	@Column({
		allowNull: false,
		defaultValue: 0,
		type: 'double precision',
	})
	additionalTotal: number

	@Column({
		allowNull: false,
		defaultValue: 0,
		type: 'double precision',
	})
	erectDismantleTotal: number

	@Column({
		allowNull: false,
		defaultValue: 'Ready to Send',
	})
	emailStatus: string

	@Column({
		type: 'double precision',
		allowNull: true,
	})
	longitude: number

	@Column({
		type: 'double precision',
		allowNull: true,
	})
	latitude: number

	@Column
	fullAddress: string

	@ForeignKey(() => Client)
	@Column
	client: number

	@BelongsTo(() => Client)
	clientData: Client
}
