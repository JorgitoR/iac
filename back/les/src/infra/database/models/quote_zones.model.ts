import {
	Model,
	Column,
	Table,
	DataType,
	ForeignKey,
} from 'sequelize-typescript'
import { Quotes } from './quotes.model'

@Table({ tableName: 'quote_zones' })
export class QuoteZones extends Model<QuoteZones> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	id: number

	@Column({
		type: DataType.INTEGER,
		field: 'zone_id',
		allowNull: false,
	})
	zone_id: string

	@Column({
		type: DataType.STRING,
		field: 'zone_label',
		allowNull: false,
	})
	zone_label: string

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
