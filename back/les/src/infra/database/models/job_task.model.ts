import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
} from 'sequelize-typescript'
import { Jobs } from './jobs.model'

@Table({ tableName: 'job_tasks' })
export class JobTask extends Model<JobTask> {
	@Column({
		type: DataType.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		field: 'id',
	})
	id!: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'zone',
	})
	zone!: string | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'zone_label',
	})
	zone_label!: string | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'type',
	})
	type!: string | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'description',
	})
	description!: string | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'total_hours',
	})
	total_hours!: string | null

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
		field: 'task_value',
	})
	task_value?: number | null

	@ForeignKey(() => Jobs)
	@Column({
		type: DataType.BIGINT,
		allowNull: true,
		field: 'job_id',
	})
	job_id!: number | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'task_type',
	})
	task_type!: string | null

	@Column({
		type: DataType.BIGINT,
		allowNull: true,
		field: 'quote_id',
	})
	quote_id!: number | null

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'No',
		field: 'complete',
	})
	complete!: string

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
		field: 'percentage_complete',
		defaultValue: 0,
	})
	percentage_complete!: number | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'handover_url',
	})
	handover_url!: string | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'PO_Number',
	})
	PO_Number!: string | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'Requester',
	})
	Requester!: string | null

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
		defaultValue: 0,
		field: 'percentage_erect',
	})
	percentage_erect!: number | null

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
		defaultValue: 0,
		field: 'percentage_dismantle',
	})
	percentage_dismantle!: number | null

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
		defaultValue: 0,
		field: 'hire_rate',
	})
	hire_rate: number | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'LastEditDate',
	})
	LastEditDate!: string | null

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'created_by',
	})
	created_by!: string | null
}
