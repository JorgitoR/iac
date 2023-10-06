import {
	Model,
	Column,
	Table,
	ForeignKey,
	BelongsTo,
	DataType,
} from 'sequelize-typescript'
import { Jobs } from './jobs.model'

@Table({ tableName: 'scaffold_tags' })
export class ScaffoldTags extends Model<ScaffoldTags> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.BIGINT,
	})
	id!: number

	@ForeignKey(() => Jobs)
	@Column({
		type: DataType.BIGINT,
		allowNull: false,
	})
	job_id!: number

	@Column(DataType.STRING)
	tag_no?: string

	@Column(DataType.TEXT)
	description?: string

	@Column(DataType.DATE)
	last_inspection?: Date

	@Column(DataType.DATE)
	inspection_due?: Date

	@Column(DataType.STRING)
	status?: string

	@Column(DataType.STRING)
	handover_doc?: string

	@Column(DataType.STRING)
	uploaded_by?: string

	@Column(DataType.BIGINT)
	taskId?: number

	@BelongsTo(() => Jobs)
	jobData!: Jobs
}
