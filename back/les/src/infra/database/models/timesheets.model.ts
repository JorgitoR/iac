import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import { Jobs } from './jobs.model'
import { Staff } from './staff.model'

@Table({
	tableName: 'timesheets',
	timestamps: false,
})
export class Timesheets extends Model<Timesheets> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	id!: number

	@Column
	date?: string

	@ForeignKey(() => Jobs)
	@Column
	job_id?: number

	@Column
	time_on?: string

	@Column
	time_off?: string

	@Column
	hours?: number

	@Column
	comments?: string

	@Column
	status?: string

	@ForeignKey(() => Staff)
	@Column
	staff_id?: number

	@Column
	timesheet_id?: string

	@Column
	approved_by?: string

	@Column
	actual_start?: string

	@Column
	actual_finish?: string

	@Column
	exported?: string

	@Column({ field: 'visitTimeSheetId' })
	visitTimeSheetId?: string
}
