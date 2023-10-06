import { InvestigationReport } from './InvestigationReport'

export interface IInvestigationReportRepository {
	getAll(): Promise<InvestigationReport[]>
	getById(id: number): Promise<InvestigationReport>
	getByJobId(job_id: number): Promise<InvestigationReport>
	create(
		investigationReport: InvestigationReport
	): Promise<{ created: boolean; investigationReport_id: number }>
	update(
		id: number,
		investigationReport: InvestigationReport
	): Promise<{ updated: boolean }>
}
