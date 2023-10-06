import {
	Controller,
	Inject,
	Get,
	Post,
	Body,
	Put,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IJobsService, Job } from 'domain/jobs'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateJobDto } from './createJobDto'

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
	constructor(
		@Inject('IJobsService')
		private readonly jobsService: IJobsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all jobs' })
	@ApiResponse({
		status: 200,
		description: 'Jobs found',
	})
	@ApiResponse({
		status: 404,
		description: 'Jobs not found',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async getAll() {
		const response = await this.jobsService.getAll()
		return response
	}

	@Get(':job_id')
	@ApiOperation({ summary: 'Get a job by id' })
	@ApiResponse({
		status: 200,
		description: 'Job found',
	})
	@ApiResponse({
		status: 404,
		description: 'Job not found',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async getById(@Param('job_id') id: number) {
		const response = await this.jobsService.getById(id)
		return response
	}

	@Put()
	@ApiOperation({ summary: 'Create a job' })
	@ApiResponse({
		status: 200,
		description: 'Job created',
	})
	@ApiResponse({
		status: 404,
		description: 'Job not created',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async create(@Body() job: CreateJobDto) {
		const response = await this.jobsService.create({
			client_id: job.client_id,
			job_type: job.job_type,
			branding: job.branding,
			site: job.site,
			start_date: new Date(job.start_date.split('/').reverse().join('-')),
			end_date: new Date(job.end_date.split('/').reverse().join('-')),
			descriptionOfQuote: '',
			job_status: 'Pending Handover',
			job_num: null,
			notes: '',
			latitude: null,
			longitude: null,
			on_hire: 'No',
			quote_id: null,
			status: 'Active',
			supervisor: null,
		})
		return response
	}

	@Post(':job_id')
	@ApiOperation({ summary: 'Update a job' })
	@ApiResponse({
		status: 200,
		description: 'Job updated',
	})
	@ApiResponse({
		status: 404,
		description: 'Job not found',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async update(@Param('job_id') job_id: number, @Body() job: any) {
		const jobDb = await this.jobsService.getById(job_id)
		const response = await this.jobsService.update(job_id, {
			...jobDb.data,
			start_date: new Date(job.start_date.split('/').reverse().join('-')),
			end_date: new Date(job.end_date.split('/').reverse().join('-')),
			notes: job.notes,
			status: job.status,
			job_status: job.job_status,
		})
		return response
	}
}
