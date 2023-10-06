import {
	Table,
	Column,
	Model,
	ForeignKey,
	HasMany,
	BelongsTo,
} from 'sequelize-typescript'
import { ClientContact } from './client_contacts.model'
import { Quotes } from './quotes.model'

@Table({ tableName: 'clients' })
export class Client extends Model<Client> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
	})
	id: number

	@Column
	client_name: string

	@Column
	site: string

	@Column
	phone: string

	@Column({
		allowNull: false,
		unique: true,
	})
	email: string

	@Column
	status: string

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

	@ForeignKey(() => ClientContact)
	@Column
	main_contact: number

	@HasMany(() => ClientContact)
	contactsData: ClientContact[]

	@BelongsTo(() => ClientContact, 'main_contact')
	mainContactData: ClientContact

	@HasMany(() => Quotes)
	quotes: Quotes[]
}
