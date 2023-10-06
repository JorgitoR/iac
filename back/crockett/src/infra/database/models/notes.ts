import {
	Model,
	Table,
	Column,
	ForeignKey,
	PrimaryKey,
	AutoIncrement,
	DataType,
} from 'sequelize-typescript'
import { Assets } from './assets.model'
import { Client } from './clients.model'
import { InvestigationReports } from './investigation_reports'
import { Jobs } from './jobs.model'
import { Staff } from './staff.model'
import { Vehicles } from './vehicles.model'

@Table({ tableName: 'notes', timestamps: false })
export class Notes extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.BIGINT)
	id!: number

	@Column(DataType.STRING)
	fileName: string | null

	@Column(DataType.STRING)
	fileType: string | null

	@Column(DataType.STRING)
	fileDescription: string | null

	@Column(DataType.STRING)
	fileUrl: string | null

	@Column(DataType.TEXT)
	notes!: string | null

	@Column(DataType.TEXT)
	createdDate!: string | null

	@ForeignKey(() => Jobs)
	@Column(DataType.BIGINT)
	job_id!: number | null

	@ForeignKey(() => Client)
	@Column(DataType.BIGINT)
	client_id!: number | null

	@ForeignKey(() => Staff)
	@Column(DataType.BIGINT)
	staff_id!: number | null

	@ForeignKey(() => Assets)
	@Column(DataType.BIGINT)
	asset_id!: number | null

	@ForeignKey(() => Vehicles)
	@Column(DataType.BIGINT)
	vehicle_id!: number | null

	@ForeignKey(() => InvestigationReports)
	@Column(DataType.BIGINT)
	investigation_id!: number | null
}
