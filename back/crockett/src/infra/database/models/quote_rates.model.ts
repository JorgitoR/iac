import {
	Model,
	Column,
	Table,
	DataType,
	ForeignKey,
} from 'sequelize-typescript'
import { Quotes } from './quotes.model'

@Table({ tableName: 'quote_rates', schema: 'public' })
export class QuoteRates extends Model<QuoteRates> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	id: number

	@Column({
		type: DataType.STRING,
		field: 'service',
		allowNull: false,
		defaultValue: 'General',
	})
	service: string

	@Column({
		type: DataType.STRING,
		field: 'type',
		allowNull: false,
		defaultValue: 'General',
	})
	type: string

	@Column({
		type: DataType.INTEGER,
		field: 'fee',
		allowNull: false,
	})
	fee: number

	@Column({
		field: 'quote_id',
		type: DataType.INTEGER,
		allowNull: false,
		references: { model: Quotes, key: 'id' },
		onDelete: 'CASCADE',
	})
	@ForeignKey(() => Quotes)
	quote_id: number
}
