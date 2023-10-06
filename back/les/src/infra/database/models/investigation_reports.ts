import { Model, Column, Table, DataType } from 'sequelize-typescript'

@Table({ tableName: 'investigation_reports' })
export class InvestigationReports extends Model<InvestigationReports> {
	@Column({
		field: 'id',
		type: DataType.BIGINT,
		allowNull: false,
		primaryKey: true,
	})
	id!: number

	@Column({ field: 'assigned_to', type: DataType.BIGINT, allowNull: true })
	assignedTo!: number

	@Column({ field: 'date_required', type: DataType.STRING, allowNull: true })
	dateRequired!: string

	@Column({ field: 'note', type: DataType.TEXT, allowNull: true })
	note!: string

	@Column({ field: 'completed', type: DataType.STRING, allowNull: true })
	completed!: string

	@Column({ field: 'date_completed', type: DataType.STRING, allowNull: true })
	dateCompleted!: string

	@Column({ field: 'file', type: DataType.STRING, allowNull: true })
	file!: string

	@Column({ field: 'created_by', type: DataType.STRING, allowNull: true })
	createdBy!: string

	@Column({ field: 'follow_up_file', type: DataType.STRING, allowNull: true })
	followUpFile!: string

	@Column({ field: 'address', type: DataType.STRING, allowNull: true })
	address!: string

	@Column({ field: 'type', type: DataType.STRING, allowNull: true })
	type!: string

	@Column({ field: 'action_required', type: DataType.STRING, allowNull: true })
	actionRequired!: string
}
