import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import { IAppenateService } from 'domain/appenate'
import { IHandoverService } from 'domain/handover'
import { IJobsService, IJobsRepository, Job } from 'domain/jobs'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class JobsService implements IJobsService {
	constructor(
		@Inject('IJobsRepository')
		private readonly jobsRepository: IJobsRepository,
		@Inject('IHandoverService')
		private readonly handoverService: IHandoverService,
		@Inject('IAppenateService')
		private readonly appenateService: IAppenateService
	) {}
	async getAll(): Promise<ResponseModel<Job[]>> {
		try {
			const jobs = await this.jobsRepository.getAll()
			return {
				code: 200,
				message: 'Jobs List',
				data: jobs,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getById(id: number): Promise<ResponseModel<Job>> {
		try {
			const job = await this.jobsRepository.getById(id)
			if (job == null) {
				throw new NotFoundException({
					code: 404,
					message: 'Job not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Job',
				data: job,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async create(job: Job): Promise<
		ResponseModel<{
			created: boolean
			job_id: number
		}>
	> {
		try {
			const jobCreated = await this.jobsRepository.create(job)
			if (!jobCreated) {
				throw new ConflictException({
					code: 409,
					message: 'Job already exists',
					data: null,
				})
			}

			const jobData = await this.jobsRepository.getById(jobCreated.job_id)

			const job_num = `${Number(jobData.id) + 1000}`

			await this.jobsRepository.update(jobCreated.job_id, {
				...jobData,
				job_num,
			})

			await this.handoverService.create({
				job_id: jobCreated.job_id,
				billing_address: '',
				credit_check: '',
				work_safe: '',
				sssp_added: '',
				hs_officer_phone: '',
				hs_officer_email: '',
				site_forman_email: '',
				site_forman_phone: '',
				gear_shortages: '',
				allowed_quote: '',
				engaged_engineer: '',
				staff_availability: '',
				booked_shrinkwrappers: '',
				credit_check_who: '',
				credit_check_when: '',
				swms_added: '',
				worksafe_uploaded: '',
				worksafe_uploaded_when: '',
				hs_officer: '',
				site_forman: '',
				invoiceType: '',
				hs_officer_client: '',
				hs_officer_client_number: '',
				hs_officer_client_email: '',
				site_forman2: '',
				site_forman_phone2: '',
				site_forman_email2: '',
				operation_assignee: null,
			})
			await this.appenateService.updateJobsTable({
				id: jobCreated.job_id,
				...jobData,
			})

			return {
				code: 201,
				message: 'Job created',
				data: {
					created: true,
					job_id: jobCreated.job_id,
				},
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: {
					created: false,
					job_id: null,
				},
			})
		}
	}
	async update(
		id: number,
		job: Job
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const jobUpdated = await this.jobsRepository.update(id, job)
			if (!jobUpdated) {
				throw new InternalServerErrorException({
					code: 500,
					message: 'Job not updated',
					data: { updated: false },
				})
			}

			await this.appenateService.updateJobsTable({
				id,
				...job,
			})

			return {
				code: 200,
				message: 'Job updated',
				data: { updated: true },
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: { updated: false },
			})
		}
	}
}
