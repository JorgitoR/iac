import {
	Table,
	Column,
	Model,
	ForeignKey,
	DataType,
	BelongsTo,
} from 'sequelize-typescript'
import { Jobs } from './jobs.model'
import { Staff } from './staff.model'

@Table({ tableName: 'visits' })
export class Visits extends Model<Visits> {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number

	@Column
	date: string

	@ForeignKey(() => Jobs)
	@Column
	job_id: number

	@ForeignKey(() => Staff)
	@Column
	team_leader_id: number

	@Column
	risk: string

	@Column
	type: string

	@Column
	swms_document: string

	@Column({ type: 'text' })
	notes: string

	@Column
	comments: string

	@Column(DataType.ARRAY(DataType.BIGINT))
	staff_ids?: number[]

	@Column(DataType.ARRAY(DataType.STRING))
	staff_labels: string[]

	@Column(DataType.ARRAY(DataType.STRING))
	task_ids: number[]

	@Column(DataType.ARRAY(DataType.STRING))
	task_labels: string[]

	@Column
	visit_status: string

	@Column
	status: string

	@Column
	time_on: string

	@Column
	time_off: string

	@Column(DataType.ARRAY(DataType.STRING))
	vehicle_ids: number[]

	@Column(DataType.ARRAY(DataType.STRING))
	vehicle_labels: string[]

	@Column
	start_time: string

	@ForeignKey(() => Staff)
	team_leader: Staff

	@BelongsTo(() => Staff)
	teamLeaderData: Staff

	@BelongsTo(() => Jobs)
	jobData: Jobs
}
