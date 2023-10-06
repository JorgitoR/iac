import {
	Model,
	Column,
	Table,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript'
import { Staff } from './staff.model'

@Table({ tableName: 'leave', underscored: true })
export class Leave extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id!: number

	@ForeignKey(() => Staff)
	@Column
	staffId!: number

	@Column
	type!: string | null

	@Column({ field: 'start_date' })
	startDate!: string | null

	@Column({ field: 'end_date' })
	endDate!: string | null

	@Column
	comments!: string | null

	@Column({ field: 'total_days' })
	totalDays!: number | null

	@Column
	status!: string | null

	@Column({ field: 'approved_by' })
	approvedBy!: string | null

	@BelongsTo(() => Staff)
	staff!: Staff
}
