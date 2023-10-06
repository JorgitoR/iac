import {
	Model,
	Column,
	Table,
	PrimaryKey,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript'
import { Jobs } from './jobs.model'

@Table({
	tableName: 'weekly_hire_invoices',
	timestamps: true,
	underscored: true,
})
export class WeeklyHireInvoices extends Model<WeeklyHireInvoices> {
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: true,
	})
	id!: number

	@ForeignKey(() => Jobs)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	job_id!: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	zone!: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	zone_label!: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	type!: string

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	description!: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'No',
	})
	on_hire!: string

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	completed!: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	date_on_hire!: string

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	days_on_hire!: number

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	weekly_hire_rate!: number

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	total!: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	completed_date!: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	handover_url!: string

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	task_id!: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'Pending',
	})
	status!: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	xeroReference!: string

	@BelongsTo(() => Jobs)
	jobData: Jobs
}
