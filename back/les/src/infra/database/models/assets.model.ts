import {
	Table,
	Column,
	Model,
	DataType,
	BelongsTo,
	ForeignKey,
} from 'sequelize-typescript'
import { Staff } from './staff.model'

@Table({
	tableName: 'assets',
})
export class Assets extends Model<Assets> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id: number

	@Column(DataType.STRING)
	manufacture_num: string

	@Column(DataType.STRING)
	item_code: string

	@Column(DataType.STRING)
	asset_type: string

	@Column(DataType.STRING)
	asset_category: string

	@ForeignKey(() => Staff)
	@Column(DataType.INTEGER)
	assigned_to: number

	@Column(DataType.STRING)
	last_inspected: string

	@Column(DataType.STRING)
	next_inspection: string

	@Column(DataType.STRING)
	asset_expiry: string

	@Column(DataType.STRING)
	status: string

	@Column(DataType.STRING)
	date_assigned: string

	@Column(DataType.STRING)
	manufacture_date: string

	@Column(DataType.STRING)
	make_type: string

	@Column(DataType.TEXT)
	comments: string

	@Column(DataType.STRING)
	photo_1: string

	@Column(DataType.STRING)
	photo_2: string

	@Column(DataType.STRING)
	hardwareStatus: string

	@Column(DataType.STRING)
	hardwareComments: string

	@Column(DataType.STRING)
	webbingStatus: string

	@Column(DataType.STRING)
	webbingComments: string

	@Column(DataType.STRING)
	stitchingStatus: string

	@Column(DataType.STRING)
	stitchingComments: string

	@Column(DataType.STRING)
	labelsStatus: string

	@Column(DataType.STRING)
	labelsComments: string

	@Column(DataType.STRING)
	syntheticropeStatus: string

	@Column(DataType.STRING)
	syntheticropeComments: string

	@Column(DataType.STRING)
	energycomponentStatus: string

	@Column(DataType.STRING)
	energycomponentComments: string

	@Column(DataType.STRING)
	overall: string

	@BelongsTo(() => Staff)
	staffData: Staff
}
