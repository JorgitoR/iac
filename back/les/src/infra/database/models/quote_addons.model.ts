import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
} from 'sequelize-typescript'
import { Quotes } from './quotes.model'

@Table({ tableName: 'quote_addons' })
export class QuoteAddons extends Model<QuoteAddons> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	type: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	description: string

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	duration_quantity: number

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	hire_fee: number

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	fixed_charge: number

	@Column({
		type: DataType.FLOAT,
		allowNull: true,
	})
	total_cost: number

	@Column({
		type: DataType.DATE,
		allowNull: false,
		defaultValue: DataType.NOW,
		field: 'created_at',
	})
	created_at: Date

	@Column({
		type: DataType.DATE,
		allowNull: false,
		defaultValue: DataType.NOW,
		field: 'updated_at',
	})
	updated_at: Date

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		field: 'quote_id',
		references: { model: Quotes, key: 'id' },
		onDelete: 'CASCADE',
	})
	@ForeignKey(() => Quotes)
	quote_id: number
}
