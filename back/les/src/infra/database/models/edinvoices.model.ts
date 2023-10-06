import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	DataType,
} from 'sequelize-typescript'
import { Jobs } from './jobs.model'

@Table({
	tableName: 'edinvoices',
})
export class EdInvoices extends Model<EdInvoices> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number

	@Column
	zone!: string

	@Column
	zone_label!: string

	@Column
	type!: string

	@Column
	description!: string

	@Column
	erect_percent!: number

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	erect!: number

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	dismantle_percent!: number

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	dismantle!: number

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	total!: number

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	complete_percent!: number

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	invoiced!: number

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	balance!: number

	@Column
	last_time_updated!: Date

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0,
	})
	last_invoice!: number

	@Column({
		defaultValue: 'Pending',
	})
	status!: string

	@Column
	task_id!: number

	@Column
	PO_Number!: string

	@Column
	Quote_Number!: string

	@Column
	xeroReference!: string

	@ForeignKey(() => Jobs)
	@Column
	job_id!: number

	@BelongsTo(() => Jobs)
	jobData: Jobs
}
