import { Injectable, Inject } from '@nestjs/common'
import { ITimesheetsRepository, Timesheet } from 'domain/timsheets'
import { PostgresAdapter, Timesheets as TimesheetsDb } from 'infra/database'

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
	async getAllById(id: number): Promise<Timesheet> {
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
	async create(timesheet: Timesheet): Promise<{ created: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTimesheet = await db.model(TimesheetsDb).create(timesheet as any)
			const dataResult = newTimesheet.toJSON() as Timesheet

			return Promise.resolve({ created: true })
		} catch (error) {
			return Promise.resolve({ created: false })
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
}
