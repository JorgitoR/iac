import { Injectable, Inject } from '@nestjs/common'
import { IVisitsRepository, Visits } from 'domain/visits'
import {
	PostgresAdapter,
	Visits as VisistsDb,
	VisitTimesheets as VisitTimesheetsDb,
} from 'infra/database'
import { VisitTimesheet } from 'domain/visits-timesheets'

@Injectable()
export class VisitsDtb implements IVisitsRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Visits[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const visits = await db.model(VisistsDb).findAll({
				include: [
					{
						model: db.model('Jobs'),
						as: 'jobData',
					},
					{
						model: db.model('Staff'),
						as: 'teamLeaderData',
					},
				],
			})
			if (visits == null) {
				return Promise.resolve([])
			}
			const dataResult = visits.map((item) => item.dataValues as Visits)
			return Promise.resolve(dataResult)
		} catch (error) {
			Promise.resolve([])
		}
	}
	async getAllByJobId(job_id: number): Promise<Visits[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const visits = await db.model(VisistsDb).findAll({
				where: {
					job_id: job_id,
				},
				include: [
					{
						model: db.model('Jobs'),
						as: 'jobData',
					},
					{
						model: db.model('Staff'),
						as: 'teamLeaderData',
					},
				],
			})
			if (visits == null) {
				return Promise.resolve(null)
			}
			const dataResult = visits.map((item) => item.dataValues as Visits)
			return Promise.resolve(dataResult)
		} catch (error) {
			Promise.resolve(null)
		}
	}
	async getById(id: number): Promise<Visits> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const visit = await db.model(VisistsDb).findByPk(id, {
				include: [
					{
						model: db.model('Jobs'),
						as: 'jobData',
					},
					{
						model: db.model('Staff'),
						as: 'teamLeaderData',
					},
				],
			})
			if (visit == null) {
				return Promise.resolve(null)
			}
			const dataResult = visit.toJSON() as Visits
			return Promise.resolve(dataResult)
		} catch (error) {
			Promise.resolve(null)
		}
	}

	async create(visit: Visits): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newVisit = await db.model(VisistsDb).create(visit as any)
			const dataResult = newVisit.toJSON() as Visits
			return Promise.resolve({ created: true, id: dataResult.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(id: number, visit: Visits): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const updatedVisit = await db.model(VisistsDb).update(visit as any, {
				where: {
					id: id,
				},
			})
			if (updatedVisit == null) {
				return Promise.resolve({ updated: false })
			}
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async createVisitTimesheet(
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
	async getAllByJobIdAndTimeOff(
		job_id: number,
		time_off: string
	): Promise<VisitTimesheet[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const timesheets = await db.model(VisitTimesheetsDb).findAll({
				where: {
					job_id: job_id,
					time_off: time_off,
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
	async updateVisitTimesheet(
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
