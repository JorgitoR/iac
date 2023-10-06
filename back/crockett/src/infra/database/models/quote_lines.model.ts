import {
	Model,
	Column,
	Table,
	DataType,
	ForeignKey,
} from 'sequelize-typescript'

import { Quotes } from './quotes.model'

@Table({ tableName: 'quote_lines', schema: 'public' })
export class QuoteLines extends Model<QuoteLines> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	id: number

	@Column(DataType.INTEGER)
	zone_id: number

	@Column(DataType.STRING)
	zone_label: string

	@Column(DataType.STRING)
	type: string

	@Column(DataType.TEXT)
	description: string

	@Column(DataType.INTEGER)
	length: number

	@Column(DataType.INTEGER)
	height: number

	@Column(DataType.INTEGER)
	width: number

	@Column(DataType.INTEGER)
	total_dimensions: number

	@Column(DataType.STRING)
	erect_and_dismantle: string

	@Column(DataType.STRING)
	total: string

	@Column(DataType.FLOAT)
	weekly_hire_fee: number

	@Column(DataType.FLOAT)
	quantity: number

	@Column({ field: 'total_days', type: DataType.FLOAT })
	total_days: number

	@Column({ field: 'percentageWeeklyHireFee', type: DataType.FLOAT })
	percentage_weekly_hire_fee: number

	@Column({ field: 'created_at', type: DataType.DATE })
	created_at: Date

	@Column({ field: 'updated_at', type: DataType.DATE })
	updated_at: Date

	@Column({
		field: 'quote_id',
		type: DataType.INTEGER,
		references: { model: Quotes, key: 'id' },
		onDelete: 'CASCADE',
	})
	@ForeignKey(() => Quotes)
	quote_id: number
}
