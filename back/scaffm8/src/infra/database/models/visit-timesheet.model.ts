import {
	Model,
	Table,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript'
import { Jobs } from './jobs.model'
import { Staff } from './staff.model'
import { Visits } from './visits.model'

@Table({ tableName: 'visit_timesheets' })
export class VisitTimesheets extends Model<VisitTimesheets> {
	@Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
	id!: number

	@ForeignKey(() => Jobs)
	@Column(DataType.BIGINT)
	job_id!: number | null

	@ForeignKey(() => Visits)
	@Column(DataType.BIGINT)
	visit_id!: number | null

	@ForeignKey(() => Staff)
	@Column(DataType.BIGINT)
	supervisor_id!: number | null

	@Column({
		type: DataType.JSON,
		allowNull: false,
		defaultValue: [],
	})
	staff_labels!: object | null

	@Column({
		type: DataType.JSON,
		allowNull: false,
		defaultValue: [],
	})
	staff_ids!: object | null

	@Column(DataType.STRING)
	time_in!: string | null

	@Column(DataType.STRING)
	time_off!: string | null

	@Column(DataType.STRING)
	status!: string | null

	@BelongsTo(() => Jobs, 'job_id')
	job!: Jobs

	@BelongsTo(() => Staff, 'supervisor_id')
	supervisor!: Staff

	@BelongsTo(() => Visits, 'visit_id')
	visit!: Visits
}
