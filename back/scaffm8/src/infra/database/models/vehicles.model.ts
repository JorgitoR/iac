import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
} from 'sequelize-typescript'

@Table({ tableName: 'vehicles', timestamps: true })
export class Vehicles extends Model<Vehicles> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.BIGINT })
	id: number

	@AllowNull
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	Rego: string

	@AllowNull
	@Column({ type: DataType.STRING })
	Make

	@AllowNull
	@Column({ type: DataType.STRING })
	Model

	@AllowNull
	@Column({ type: DataType.STRING })
	CodeName

	@AllowNull
	@Column({ type: DataType.STRING })
	RegoDue

	@AllowNull
	@Column({ type: DataType.STRING })
	WOFDate

	@AllowNull
	@Column({ type: DataType.STRING })
	ServiceDueDate

	@AllowNull
	@Column({ type: DataType.STRING })
	ServiceDueKm

	@AllowNull
	@Column({ type: DataType.STRING })
	Odometer

	@AllowNull
	@Column({ type: DataType.STRING })
	Hubometer

	@AllowNull
	@Column({ type: DataType.STRING })
	RUC

	@AllowNull
	@Column({ type: DataType.STRING })
	OperationalStatus

	@AllowNull
	@Column({ type: DataType.STRING })
	Status

	@AllowNull
	@Column({ type: DataType.STRING })
	Date

	@AllowNull
	@Column({ type: DataType.STRING })
	Lights

	@AllowNull
	@Column({ type: DataType.STRING })
	CleanWindscreen

	@AllowNull
	@Column({ type: DataType.STRING })
	CabTidy

	@AllowNull
	@Column({ type: DataType.STRING })
	TyresDepth

	@AllowNull
	@Column({ type: DataType.STRING })
	TyresPsi

	@AllowNull
	@Column({ type: DataType.STRING })
	WasherFluid

	@AllowNull
	@Column({ type: DataType.STRING })
	OilLevel

	@AllowNull
	@Column({ type: DataType.STRING })
	BatteryLevel

	@AllowNull
	@Column({ type: DataType.STRING })
	CoolantLevel

	@AllowNull
	@Column({ type: DataType.STRING })
	AddBlue

	@AllowNull
	@Column({ type: DataType.STRING })
	DPFLevel

	@AllowNull
	@Column({ type: DataType.STRING })
	VehicleAccidentSheets

	@AllowNull
	@Column({ type: DataType.STRING })
	Loadcharts

	@AllowNull
	@Column({ type: DataType.STRING })
	BusinessCards

	@AllowNull
	@Column({ type: DataType.STRING })
	HazardSheets

	@AllowNull
	@Column({ type: DataType.STRING })
	RescueRopeScaffHook

	@AllowNull
	@Column({ type: DataType.STRING })
	FirstAidKit

	@AllowNull
	@Column({ type: DataType.JSON })
	location: { address: string; latitude: number; longitude: number }

	@AllowNull
	@Column({ type: DataType.STRING })
	Comment
}
