import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement,
	DataType,
} from 'sequelize-typescript'
import { Assets } from './assets.model'
//import { InvestigationReport } from './investigation-report.model'
import { Jobs } from './jobs.model'
import { ScaffoldTags } from './scaffold_tags.model'
import { Vehicles } from './vehicles.model'
import { Visits } from './visits.model'

@Table({ tableName: 'app_entries', timestamps: false })
export class AppEntrys extends Model<AppEntrys> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.BIGINT)
	id!: number

	@Column(DataType.STRING)
	file_type!: string | null

	@ForeignKey(() => Jobs)
	@Column(DataType.BIGINT)
	job_id!: number | null

	@Column(DataType.STRING)
	uploaded_by!: string | null

	@Column(DataType.STRING)
	link!: string | null

	@ForeignKey(() => Visits)
	@Column(DataType.BIGINT)
	visit_id!: number | null

	@ForeignKey(() => Assets)
	@Column(DataType.BIGINT)
	asset_id!: number | null

	@ForeignKey(() => Vehicles)
	@Column(DataType.BIGINT)
	vehicle_id!: number | null

	@Column(DataType.STRING)
	file_name!: string | null

	@ForeignKey(() => ScaffoldTags)
	@Column(DataType.BIGINT)
	tag_id!: number | null

	//@ForeignKey(() => InvestigationReport)
	//@Column(DataType.BIGINT)
	//investigation_id!: number | null

	@Column(DataType.STRING)
	corrective_actions!: string | null

	@BelongsTo(() => Jobs)
	job!: Jobs

	@BelongsTo(() => Visits)
	visit!: Visits

	@BelongsTo(() => Assets)
	asset!: Assets

	@BelongsTo(() => Vehicles)
	vehicle!: Vehicles

	@BelongsTo(() => ScaffoldTags)
	tag!: ScaffoldTags

	//@BelongsTo(() => InvestigationReports)
	//investigation!: InvestigationReports
}
