import { Edinvoice } from './Edinvoice'

export interface IEDInvoicesRepository {
	getAll(): Promise<Edinvoice[]>
	getAllByJobId(job_id: number): Promise<Edinvoice[]>
	getById(id: number): Promise<Edinvoice>
	create(invoice: Edinvoice): Promise<{ created: boolean; id: number }>
	update(id: number, invoice: Edinvoice): Promise<{ updated: boolean }>
	delete(id: number): Promise<{ deleted: boolean }>
}
