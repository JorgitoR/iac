import { Injectable, Inject } from '@nestjs/common'
import { ITimesheetsRepository, Timesheet } from 'domain/timesheets'
import { Staff } from 'domain/staff'
import {
	PostgresAdapter,
	Timesheets as TimesheetsDb,
	Staff as StaffDb,
} from 'infra/database'

@Injectable()
export class TimesheetsDtb implements ITimesheetsRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Timesheet[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheets = await db.model(TimesheetsDb).findAll()

			const dataResult = timesheets.map((item) => item.toJSON() as Timesheet)

			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Timesheet> {
		console.log('getAllByIdgetAllById')
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheet = await db.model(TimesheetsDb).findByPk(id)
			if (timesheet == null) {
				return Promise.resolve(null)
			}
			const dataResult = timesheet.toJSON() as Timesheet

			return dataResult
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getAllByJobId(job_id: number): Promise<Timesheet[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheets = await db.model(TimesheetsDb).findAll({
				where: {
					job_id: job_id,
				},
			})

			const dataResult = timesheets.map((item) => item.toJSON() as Timesheet)

			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getAllByStaffId(staff_id: number): Promise<Timesheet[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheets = await db.model(TimesheetsDb).findAll({
				where: {
					staff_id: staff_id,
				},
			})

			const dataResult = timesheets.map((item) => item.toJSON() as Timesheet)

			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async create(
		timesheet: Timesheet
	): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTimesheet = await db.model(TimesheetsDb).create(timesheet as any)
			const dataResult = newTimesheet.toJSON() as Timesheet

			return Promise.resolve({ created: true, id: newTimesheet.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(
		id: number,
		timesheet: Timesheet
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTimesheet = await db
				.model(TimesheetsDb)
				.update(timesheet as any, {
					where: {
						id: id,
					},
				})

			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async getByTimesheetId(timesheet_id: string): Promise<Timesheet[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheets = await db.model(TimesheetsDb).findAll({
				where: {
					timesheet_id: timesheet_id,
				},
			})
			if (timesheets == null) {
				return Promise.resolve(null)
			}
			const dataResult = timesheets.map((item) => item.toJSON() as Timesheet)

			return dataResult
		} catch (error) {
			return Promise.resolve(null)
		}
	}

	async updateStaff(id: number, staff: Staff): Promise<{ updated: boolean }> {
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
}
