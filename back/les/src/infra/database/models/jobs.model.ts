import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript'
import { Client } from './clients.model'
import { Staff } from './staff.model'

@Table({
	tableName: 'jobs',
})
export class Jobs extends Model<Jobs> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.BIGINT)
	id!: number

	@Column(DataType.STRING)
	job_num?: string

	@Column(DataType.STRING)
	job_type?: string

	@ForeignKey(() => Client)
	@Column(DataType.BIGINT)
	client_id?: number

	@BelongsTo(() => Client)
	clientData?: Client

	@Column(DataType.DATE)
	start_date?: Date

	@Column(DataType.DATE)
	end_date?: Date

	@Column(DataType.STRING)
	status!: string

	@Column(DataType.STRING)
	site?: string

	@Column(DataType.STRING)
	job_status?: string

	@ForeignKey(() => Staff)
	@Column(DataType.BIGINT)
	supervisor?: number

	@BelongsTo(() => Staff)
	estimatorData?: Staff

	@Column(DataType.STRING)
	branding?: string

	@Column(DataType.BIGINT)
	quote_id?: number

	@Column({
		type: DataType.STRING,
		field: 'on_hire',
		allowNull: false,
		defaultValue: 'No',
	})
	on_hire!: string

	@Column(DataType.TEXT)
	descriptionOfQuote?: string

	@Column(DataType.TEXT)
	notes?: string

	@Column(DataType.DOUBLE)
	latitude?: number

	@Column(DataType.DOUBLE)
	longitude?: number
}
