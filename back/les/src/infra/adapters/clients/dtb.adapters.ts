import { Injectable, Inject } from '@nestjs/common'
import { IClientsRepository, Client } from 'domain/clients'
import {
	PostgresAdapter,
	Client as ClientDb,
	ClientContact as ClientContactDb,
} from 'infra/database'

@Injectable()
export class ClientDtb implements IClientsRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Client[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const clients = await db.model(ClientDb).findAll({
				include: [
					{
						model: db.model(ClientContactDb),
						as: 'mainContactData',
					},
				],
			})
			if (clients == null) {
				return []
			}
			const dataResult = clients.map((item) => item.toJSON() as Client)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Client> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const staff = await db.model(ClientDb).findByPk(id, {
				include: [
					{
						model: db.model(ClientContactDb),
						as: 'mainContactData',
					},
				],
			})
			if (staff == null) {
				return Promise.resolve(null)
			}
			const dataResult = staff.toJSON() as Client

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(user: Client): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newUser = await db.model(ClientDb).create(user as any)
			if (newUser == null) {
				return Promise.resolve({ created: false, id: null })
			}
			return Promise.resolve({ created: true, id: newUser.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	update(id: number, staff: Client): Promise<{ updated: boolean }> {
		try {
			const db = this.dtb.getSequelizeInstance()
			db.model(ClientDb).update(staff as any, { where: { id } })
			if (staff == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	validateClientEmail(email: string): Promise<boolean> {
		try {
			const db = this.dtb.getSequelizeInstance()
			const staff = db.model(ClientDb).findOne({ where: { email } })
			if (staff == null) {
				return Promise.resolve(false)
			}
			return Promise.resolve(true)
		} catch {
			return Promise.resolve(false)
		}
	}
}
