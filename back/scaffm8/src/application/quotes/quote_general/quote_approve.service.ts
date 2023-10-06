import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'

import {
	IApproveQuotesService,
	IQuoteLinesRepository,
	IQuotesRepository,
	IQuotesAddonsRepository,
} from 'domain/quotes'

import { IJobsService } from 'domain/jobs'

import { ITaskService } from 'domain/task'

import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class AproveQuotesService implements IApproveQuotesService {
	constructor(
		@Inject('IQuotesRepository')
		private readonly quotesRepository: IQuotesRepository,
		@Inject('IQuoteLinesRepository')
		private readonly quoteLinesRepository: IQuoteLinesRepository,
		@Inject('IQuotesAddonsRepository')
		private readonly quotesAddonsRepository: IQuotesAddonsRepository,
		@Inject('IJobsService')
		private readonly jobsService: IJobsService,
		@Inject('ITaskService')
		private readonly taskService: ITaskService
	) {}
	async approveQuote(
		id: number,
		appovedBy: string,
		approveComment: string
	): Promise<ResponseModel<{ quote_approved: boolean }>> {
		const quote = await this.quotesRepository.getById(id)
		if (!quote) {
			throw new NotFoundException({
				code: 404,
				message: 'Quote not found',
				data: null,
			})
		}
		const quoteUpdated = await this.quotesRepository.update(id, {
			...quote,
			status: 'Approved',
			approved_by: appovedBy,
			approveComment: approveComment,
		})
		if (!quoteUpdated) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
		const quoteLines = await this.quoteLinesRepository.getAllByQuoteID(id)

		const quoteAddons = await this.quotesAddonsRepository.getAllbyQuoteID(id)

		let job_id = null
		let task_type = 'Task'
		if (quote.quote_type == 'New') {
			const job = await this.jobsService.create({
				job_num: '',
				job_type: quote.job_type,
				client_id: quote.client,
				start_date: new Date(),
				end_date: new Date(new Date().setMonth(new Date().getMonth() + 3)),
				status: 'Active',
				site: quote.street,
				job_status: 'Pending Handover',
				supervisor: null,
				branding: 'scaffm8',
				quote_id: quote.id,
				on_hire: 'No',
				descriptionOfQuote: quote.scope_of_work,
				notes: '',
				latitude: quote.latitude || null,
				longitude: quote.longitude || null,
			})
			if (!job.data.job_id) {
				throw new InternalServerErrorException({
					code: 500,
					message: 'Internal Server Error',
					data: null,
				})
			}
			job_id = job.data.job_id
		} else if (quote.quote_type == 'Variation') {
			job_id = quote.variation_job_id
			task_type = 'Variation'
		}

		for (const iterator of quoteLines) {
			await this.taskService.create(job_id, {
				zone: iterator.zone_id.toString(),
				zone_label: iterator.zone_label,
				type: iterator.type,
				description: iterator.description,
				total_hours: iterator.quantity.toString(),
				job_id: job_id,
				task_type: task_type,
				quote_id: id,
				quote_num: quote.quote_num,
				complete: 'No',
				percentage_complete: 0,
				handover_url: '',
				PO_Number: quote.PO_Number,
				Requester: '',
				percentage_erect: 0,
				percentage_dismantle: 0,
				LastEditDate: new Date().toISOString(),
				created_by: appovedBy,
				hire_rate: iterator.weekly_hire_fee,
				task_value: Number(iterator.total),
			})
		}

		return {
			data: { quote_approved: true },
			code: 200,
			message: 'OK',
		}
	}
}
