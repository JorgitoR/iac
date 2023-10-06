import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	HasMany,
	HasOne,
} from 'sequelize-typescript'
import { Client } from './clients.model'
import { Quotes } from './quotes.model'

@Table({
	tableName: 'client_contacts',
})
export class ClientContact extends Model<ClientContact> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
	})
	id: number

	@ForeignKey(() => Client)
	@Column({
		field: 'client_id',
		allowNull: false,
		type: 'integer',
		references: { model: 'clients', key: 'id' },
	})
	client_id: number

	@BelongsTo(() => Client)
	client: Client

	@Column
	name: string

	@Column({
		allowNull: false,
	})
	email: string

	@Column
	phone: string

	@Column({
		allowNull: false,
		defaultValue: new Date(),
	})
	created_at: Date

	@Column({
		allowNull: false,
		defaultValue: new Date(),
	})
	updated_at: Date

	@Column({
		defaultValue: 'Active',
	})
	status: string

	@HasMany(() => Quotes)
	quotes: Quotes[]

	@HasOne(() => Client)
	main_contact: Client
}
