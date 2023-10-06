import {
	Injectable,
	Inject,
	UnauthorizedException,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import * as moment from 'moment'
import { IHandoverService } from 'domain/handover'
import {
	IInvoicesService,
	IEDInvoicesRepository,
	IWeeklyHireRepository,
	WeeklyHire,
	Edinvoice,
} from 'domain/invoices'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class InvoicesServices implements IInvoicesService {
	constructor(
		@Inject('IEDInvoicesRepository')
		private readonly edInvoicesRepository: IEDInvoicesRepository,
		@Inject('IWeeklyHireRepository')
		private readonly weeklyHireRepository: IWeeklyHireRepository
	) {}
	async getAll(): Promise<
		ResponseModel<{ weeklyHires: WeeklyHire[]; edinvoices: Edinvoice[] }>
	> {
		try {
			const weeklyHire = await this.weeklyHireRepository.getAll()
			const edinvoice = await this.edInvoicesRepository.getAll()
			const weeklyHireWithTotal = weeklyHire.map((invoice) =>
				this.calculateWeeklyHire(invoice)
			)
			const edinvoiceWithTotal = edinvoice.map((invoice) =>
				this.calculateEdinvoice(invoice)
			)

			return {
				code: 200,
				message: 'Invoices List',
				data: {
					weeklyHires: weeklyHireWithTotal,
					edinvoices: edinvoiceWithTotal,
				},
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getAllWeeklyHireByJobID(
		job_id: number
	): Promise<ResponseModel<WeeklyHire[]>> {
		try {
			const weeklyHire = await this.weeklyHireRepository.getAllByJobId(job_id)

			const weeklyHireWithTotal = weeklyHire.map((invoice) =>
				this.calculateWeeklyHire(invoice)
			)

			return {
				code: 200,
				message: 'Weekly Hire List',
				data: weeklyHireWithTotal,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getAllEdinvoiceByJobID(
		job_id: number
	): Promise<ResponseModel<Edinvoice[]>> {
		try {
			const edinvoice = await this.edInvoicesRepository.getAllByJobId(job_id)

			const edinvoiceWithTotal = edinvoice.map((invoice) =>
				this.calculateEdinvoice(invoice)
			)

			return {
				code: 200,
				message: 'ED Invoice List',
				data: edinvoiceWithTotal,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getWeeklyHireById(id: number): Promise<ResponseModel<WeeklyHire>> {
		try {
			const weeklyHire = await this.weeklyHireRepository.getById(id)
			return {
				code: 200,
				message: 'Weekly Hire',
				data: weeklyHire,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getEdinvoiceById(id: number): Promise<ResponseModel<Edinvoice>> {
		try {
			const edinvoice = await this.edInvoicesRepository.getById(id)
			return {
				code: 200,
				message: 'ED Invoice',
				data: edinvoice,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async createWeeklyHire(
		job_id: number,
		invoice: WeeklyHire
	): Promise<
		ResponseModel<{
			created: boolean
			id: number
		}>
	> {
		try {
			const created = await this.weeklyHireRepository.create(invoice)
			return {
				code: 201,
				message: 'Weekly Hire Created',
				data: { ...created },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async createEdinvoice(
		job_id: number,
		invoice: Edinvoice
	): Promise<
		ResponseModel<{
			created: boolean
			id: number
		}>
	> {
		try {
			const created = await this.edInvoicesRepository.create({
				...invoice,
				job_id,
				erect: invoice.erect || invoice.total * 0.7,
				dismantle: invoice.dismantle || invoice.total * 0.3,
			})
			if (!created.created) {
				throw new ConflictException({
					code: 409,
					message: 'Ed Invoice not created',
					data: null,
				})
			}

			return {
				code: created.created ? 201 : 409,
				message: 'ED Invoice Created',
				data: { ...created },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async updateWeeklyHire(
		id: number,
		invoice: WeeklyHire
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const updated = await this.weeklyHireRepository.update(id, invoice)
			return {
				code: 200,
				message: 'Weekly Hire Updated',
				data: { updated: updated.updated },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}

	approveInvoices(
		invoices: {
			id: number
			invoiceType: 'Weekly Hire' | 'Ed Invoice'
		}[],
		dateCompleted: string,
		endOfMonth?: boolean
	): Promise<ResponseModel<{ approved: boolean }>> {
		const weeklyHires = invoices.filter(
			(inv) => inv.invoiceType === 'Weekly Hire'
		)
		const edinvoices = invoices.filter(
			(inv) => inv.invoiceType === 'Ed Invoice'
		)
		console.log(weeklyHires, edinvoices)
		return Promise.all([
			this.approveWeeklyHire(weeklyHires, dateCompleted, endOfMonth),
			this.approveEdInvoice(edinvoices, dateCompleted, endOfMonth),
		])
			.then((res) => {
				return {
					code: 200,
					message: 'Invoices Approved',
					data: { approved: true },
				}
			})
			.catch((err) => {
				throw new InternalServerErrorException({
					code: 500,
					message: 'Internal Server Error',
					data: null,
				})
			})
	}

	async updateEdinvoice(
		id: number,
		invoice: Edinvoice
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const updated = await this.edInvoicesRepository.update(id, {
				...invoice,
				erect: invoice.erect || invoice.total * 0.7,
				dismantle: invoice.dismantle || invoice.total * 0.3,
			})
			return {
				code: 200,
				message: 'ED Invoice Updated',
				data: { updated: updated.updated },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}

	async approveWeeklyHire(
		invoices: {
			id: number
		}[],
		dateCompleted: string,
		endOfMonth?: boolean
	): Promise<ResponseModel<{ approved: boolean }>> {
		const weeklyHires = await invoices.map(async (inv) => {
			const invoice = await this.weeklyHireRepository.getById(inv.id)
			if (invoice) {
				const newInvoice = this.calculateWeeklyHire(invoice, dateCompleted)

				const updated = await this.weeklyHireRepository.update(inv.id, {
					...newInvoice,
					completed_date: dateCompleted,
					status: 'Approved',
				})
				if (endOfMonth) {
					const copyInvoice = { ...newInvoice }
					delete copyInvoice.id
					delete copyInvoice.date_on_hire
					delete copyInvoice.completed_date
					delete copyInvoice.days_on_hire
					delete copyInvoice.status

					const invoiceCreated = await this.weeklyHireRepository.create({
						...copyInvoice,
					})
				}
				return updated
			}
			return null
		})
		return {
			code: 200,
			message: 'Weekly Hire Approved',
			data: { approved: true },
		}
	}

	async approveEdInvoice(
		invoices: {
			id: number
		}[],
		dateCompleted: string,
		endOfMonth?: boolean
	): Promise<ResponseModel<{ approved: boolean }>> {
		const edinvoices = await invoices.map(async (inv) => {
			const invoice = await this.edInvoicesRepository.getById(inv.id)
			if (invoice) {
				const newInvoice = this.calculateEdinvoice(invoice, dateCompleted)
				const updated = await this.edInvoicesRepository.update(inv.id, {
					...newInvoice,
					status: 'Approved',
				})
				return updated
			}
			return null
		})
		return {
			code: 200,
			message: 'ED Invoice Approved',
			data: { approved: true },
		}
	}
	async deleteWeeklyHire(
		id: number
	): Promise<ResponseModel<{ deleted: boolean }>> {
		try {
			const deleted = await this.weeklyHireRepository.delete(id)
			return {
				code: 200,
				message: 'Weekly Hire Deleted',
				data: { deleted: deleted.deleted },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async deleteEdinvoice(
		id: number
	): Promise<ResponseModel<{ deleted: boolean }>> {
		try {
			const deleted = await this.edInvoicesRepository.delete(id)
			return {
				code: 200,
				message: 'ED Invoice Deleted',
				data: { deleted: deleted.deleted },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	calculateWeeklyHire(invoice: WeeklyHire, dateCompleted?: string): WeeklyHire {
		let completeDate = moment().format('DD/MM/YYYY')
		if (invoice.completed_date) {
			completeDate = moment(invoice.completed_date, 'DD/MM/YYYY').format(
				'DD/MM/YYYY'
			)
		}
		if (dateCompleted) {
			completeDate = moment(dateCompleted, 'DD/MM/YYYY').format('DD/MM/YYYY')
		}

		const dateStart = moment(invoice.date_on_hire, 'DD/MM/YYYY')
		const days_on_hire =
			moment(completeDate, 'DD/MM/YYYY').diff(dateStart, 'days') || 0

		const total =
			(invoice.weekly_hire_rate / 5) * days_on_hire * invoice.completed || 0
		return {
			...invoice,
			total,
			days_on_hire,
		}
	}
	calculateEdinvoice(invoice: Edinvoice, dateCompleted?: string): Edinvoice {
		return invoice
	}
}
