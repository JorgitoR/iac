import { Injectable, Inject } from '@nestjs/common'
import {
	IVisitsTimesheetRepository,
	VisitTimesheet,
} from 'domain/visits-timesheets'
import {
	PostgresAdapter,
	VisitTimesheets as VisitTimesheetsDb,
} from 'infra/database'

@Injectable()
export class VisitTimesheetDtb implements IVisitsTimesheetRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<VisitTimesheet[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheets = await db.model(VisitTimesheetsDb).findAll()

			const dataResult = timesheets.map(
				(item) => item.toJSON() as VisitTimesheet
			)

			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getAllByJobId(job_id: number): Promise<VisitTimesheet[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheets = await db.model(VisitTimesheetsDb).findAll({
				where: {
					job_id: job_id,
				},
			})

			const dataResult = timesheets.map(
				(item) => item.toJSON() as VisitTimesheet
			)

			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<VisitTimesheet> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(VisitTimesheetsDb).findByPk(id)
			if (task == null) {
				return Promise.resolve(null)
			}
			const dataResult = task.toJSON() as VisitTimesheet

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(
		timesheet: VisitTimesheet
	): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTimesheet = await db
				.model(VisitTimesheetsDb)
				.create(timesheet as any)
			const dataResult = newTimesheet.toJSON() as VisitTimesheet

			return Promise.resolve({ created: true, id: newTimesheet.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(
		id: number,
		timesheet: VisitTimesheet
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTimesheet = await db
				.model(VisitTimesheetsDb)
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
