import { Model, Column, Table, DataType } from 'sequelize-typescript'

@Table({ tableName: 'service_rates' })
export class ServiceRates extends Model<ServiceRates> {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number

	@Column(DataType.STRING)
	service: string

	@Column(DataType.INTEGER)
	fee: number

	@Column({
		type: DataType.STRING,
		field: 'type',
		allowNull: false,
		defaultValue: 'General',
	})
	type: string
}
