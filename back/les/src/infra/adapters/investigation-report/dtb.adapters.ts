import { Injectable, Inject } from '@nestjs/common'
import {
	IInvestigationReportRepository,
	InvestigationReport,
} from 'domain/investigation-report'
import {
	PostgresAdapter,
	InvestigationReports as InvestigationReportsDb,
} from 'infra/database'

@Injectable()
export class InvestigationReportDtb implements IInvestigationReportRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<InvestigationReport[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const jobs = await db.model(InvestigationReportsDb).findAll()

			const dataResult = jobs.map(
				(item) => item.toJSON() as InvestigationReport
			)

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<InvestigationReport> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const job = await db
				.model(InvestigationReportsDb)
				.findOne({ where: { id } })

			const dataResult = job.toJSON() as InvestigationReport

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async getByJobId(job_id: number): Promise<InvestigationReport> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const job = await db
				.model(InvestigationReportsDb)
				.findOne({ where: { job_id } })

			const dataResult = job.toJSON() as InvestigationReport

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(
		investigationReport: InvestigationReport
	): Promise<{ created: boolean; investigationReport_id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const job = await db
				.model(InvestigationReportsDb)
				.create(investigationReport as any)

			const dataResult = job.toJSON() as InvestigationReport

			return Promise.resolve({
				created: true,
				investigationReport_id: dataResult.id,
			})
		} catch (error) {
			return Promise.resolve({
				created: false,
				investigationReport_id: null,
			})
		}
	}
	async update(
		id: number,
		investigationReport: InvestigationReport
	): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			await db
				.model(InvestigationReportsDb)
				.update(investigationReport as any, { where: { id } })

			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
}
