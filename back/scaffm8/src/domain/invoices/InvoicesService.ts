import { WeeklyHire } from './WeeklyHire'
import { Edinvoice } from './Edinvoice'
import { ResponseModel } from '../responseModel'

export interface IInvoicesService {
	getAll(dateCompleted?: string): Promise<
		ResponseModel<{
			weeklyHires: WeeklyHire[]
			edinvoices: Edinvoice[]
		}>
	>
	getAllWeeklyHireByJobID(job_id: number): Promise<ResponseModel<WeeklyHire[]>>
	getAllEdinvoiceByJobID(job_id: number): Promise<ResponseModel<Edinvoice[]>>

	getWeeklyHireById(id: number): Promise<ResponseModel<WeeklyHire>>
	getEdinvoiceById(id: number): Promise<ResponseModel<Edinvoice>>
	createWeeklyHire(
		job_id: number,
		invoice: WeeklyHire
	): Promise<
		ResponseModel<{
			created: boolean
			id: number
		}>
	>
	createEdinvoice(
		job_id: number,
		invoice: Edinvoice
	): Promise<
		ResponseModel<{
			created: boolean
			id: number
		}>
	>
	updateWeeklyHire(
		id: number,
		invoice: WeeklyHire
	): Promise<ResponseModel<{ updated: boolean }>>
	updateEdinvoice(
		id: number,
		invoice: Edinvoice
	): Promise<ResponseModel<{ updated: boolean }>>
	approveInvoices(
		invoices: {
			id: number
			invoiceType: 'Weekly Hire' | 'Ed Invoice'
		}[],
		dateCompleted: string,
		endOfMonth?: boolean
	): Promise<ResponseModel<{ approved: boolean }>>
	approveWeeklyHire(
		invoices: {
			id: number
		}[],
		dateCompleted: string,
		endOfMonth?: boolean
	): Promise<ResponseModel<{ approved: boolean }>>
	approveEdInvoice(
		invoices: {
			id: number
		}[],
		dateCompleted: string,
		endOfMonth?: boolean
	): Promise<ResponseModel<{ approved: boolean }>>
	deleteWeeklyHire(id: number): Promise<ResponseModel<{ deleted: boolean }>>
	deleteEdinvoice(id: number): Promise<ResponseModel<{ deleted: boolean }>>
	calculateWeeklyHire(invoice: WeeklyHire, dateCompleted: string): WeeklyHire
	calculateEdinvoice(invoice: Edinvoice, dateCompleted: string): Edinvoice
}
