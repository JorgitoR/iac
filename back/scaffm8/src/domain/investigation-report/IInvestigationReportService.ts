import { InvestigationReport } from './InvestigationReport'
import { ResponseModel } from '../responseModel'

export interface IInvestigationReportService {
	getAll(): Promise<ResponseModel<InvestigationReport[]>>
	getById(id: number): Promise<ResponseModel<InvestigationReport>>
	getByJobId(job_id: number): Promise<ResponseModel<InvestigationReport>>
	create(
		report: InvestigationReport
	): Promise<ResponseModel<{ created: boolean; report: number }>>
	update(
		id: number,
		report: InvestigationReport
	): Promise<ResponseModel<{ updated: boolean }>>
}
