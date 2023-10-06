import { Injectable, Inject } from '@nestjs/common'
import { IStaffRepository, Staff } from 'domain/staff'
import { PostgresAdapter, Staff as StaffDb } from 'infra/database'

@Injectable()
export class StaffDtb implements IStaffRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Staff[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const staff = await db.model(StaffDb).findAll()
			if (staff == null) {
				return []
			}
			const dataResult = staff.map((item) => item.toJSON() as Staff)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Staff> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const staff = await db.model(StaffDb).findByPk(id)
			if (staff == null) {
				return null
			}
			const dataResult = staff.dataValues as Staff

			return Promise.resolve(dataResult)
		} catch (error) {
			return null
		}
	}
	async getByEmail(email: string): Promise<Staff> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const staff = await db.model(StaffDb).findOne({
				where: {
					email: email,
				},
			})

			if (staff == null) {
				return null
			}

			const dataResult = staff.toJSON() as Staff

			return Promise.resolve(dataResult)
		} catch (error) {
			return null
		}
	}
	async create(user: Staff): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const staff = await db.model(StaffDb).build(user as any)
			await staff.save()
			return Promise.resolve({ created: true })
		} catch (error) {
			return Promise.resolve({ created: false })
		}
	}
	async update(id: number, staff: Staff): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const staffDb = await db.model(StaffDb).findByPk(id)
			if (staffDb == null) {
				return Promise.resolve({ updated: false })
			}
			await staffDb.update(staff)
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async validateStaffEmail(email: string): Promise<boolean> {
		try {
			const db = this.dtb.getSequelizeInstance()
			const data = db
				.model(StaffDb)
				.findOne({ where: { email } })
				.then((data) => {
					if (data == null) {
						return false
					}
					return true
				})
				.catch((err) => {
					return false
				})
			return data
		} catch (error) {
			return Promise.resolve(false)
		}
	}
}
