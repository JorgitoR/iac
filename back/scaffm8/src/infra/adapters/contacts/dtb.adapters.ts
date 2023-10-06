import { Injectable, Inject } from '@nestjs/common'
import { IContactsRepository, Contact } from 'domain/contacts'
import {
	PostgresAdapter,
	ClientContact as ContactDb,
	Client as ClientDb,
} from 'infra/database'

@Injectable()
export class ContactsDtb implements IContactsRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Contact[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db.model(ContactDb).findAll({
				include: [
					{
						model: db.model(ClientDb),
						as: 'client',
					},
				],
			})
			if (data == null) {
				return []
			}
			const dataResult = data.map((item) => item.toJSON() as Contact)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Contact> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const staff = await db.model(ContactDb).findByPk(id, {
				include: [
					{
						model: db.model(ClientDb),
						as: 'client',
					},
				],
			})
			if (staff == null) {
				return Promise.resolve(null)
			}
			const dataResult = staff.toJSON() as Contact

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllByClientId(client_id: number): Promise<Contact[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const data = await db
				.model(ContactDb)
				.findAll({ where: { client_id: client_id } })
			if (data == null) {
				return []
			}
			const dataResult = data.map((item) => item.toJSON() as Contact)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async create(contact: Contact): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newContact = await db.model(ContactDb).create(contact as any)
			if (newContact == null) {
				return Promise.resolve({ created: false, id: null })
			}
			return Promise.resolve({ created: true, id: newContact.id })
		} catch (error) {
			console.log(error)
			console.log('.....')
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(id: number, contact: Contact): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			await db.model(ContactDb).update(contact as any, { where: { id } })
			if (contact == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
