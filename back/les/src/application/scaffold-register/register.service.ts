import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common'
import { IRegisterService } from 'domain/scaffold-register/IRegisterService'
import { IRegisterRepository } from 'domain/scaffold-register/IRegisterRepository'
import { Register } from 'domain/scaffold-register/Register'
import { ResponseModel } from 'domain/responseModel'
import { IAppenateService } from 'domain/appenate'

@Injectable()
export class RegisterUseCase implements IRegisterService {
	constructor(
		@Inject('IRegisterRepository')
		private readonly serviceRegister: IRegisterRepository,
		@Inject('IAppenateService')
		private readonly appenateService: IAppenateService
	) {}
	async getAllRegister(): Promise<ResponseModel<Register>> {
		try {
			const response = await this.serviceRegister.getAll()
			return new ResponseModel<object>(200, response)
		} catch (error) {
			return new ResponseModel<object>(502, undefined, error.message)
		}
	}
	async getScaffoldRegisterByTagNo(
		tag_no: string
	): Promise<ResponseModel<Register>> {
		try {
			const tags = await this.serviceRegister.getByTagNo(tag_no)
			if (tags == null) {
				throw new NotFoundException({
					code: 404,
					message: 'Scaffold register not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Scaffold register found',
				data: tags,
			}
		} catch (error) {
			return new ResponseModel<Register>(502, undefined, error.message)
		}
	}

	async getScaffoldRegisterByJobId(
		job_id: number
	): Promise<ResponseModel<Register[]>> {
		try {
			const tags = await this.serviceRegister.getAllByJobId(job_id)
			if (tags == null) {
				throw new NotFoundException({
					code: 404,
					message: 'Scaffold register not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Scaffold register found',
				data: tags,
			}
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				message: 'Internal Server Error',
				data: null,
			})
		}
	}
	async getScaffoldRegisterById(id: string): Promise<ResponseModel<Register>> {
		try {
			const tags = await this.serviceRegister.getById(id)
			if (tags == null) {
				throw new NotFoundException({
					code: 404,
					message: 'Scaffold register not found',
					data: null,
				})
			}
			return {
				code: 200,
				message: 'Scaffold register found',
				data: tags,
			}
		} catch (error) {
			return new ResponseModel<Register>(502, undefined, error.message)
		}
	}

	async createScaffoldRegister(
		register: any
	): Promise<ResponseModel<Register>> {
		console.log(
			'register?.Entry?.AnswersJson?.page1',
			register?.Entry?.AnswersJson?.page1
		)
		try {
			const validateJob = await this.serviceRegister.validateJobs(
				register?.Entry?.AnswersJson?.page1.jobID
			)
			const validateTag = await this.serviceRegister.validateTag(
				register?.Entry?.AnswersJson?.page1.tagNo
			)
			console.log('validateTagvalidateTag', validateJob, validateTag)
			if (validateTag) {
				return new ResponseModel<Register>(
					400,
					undefined,
					'Tag_no is unique and already exist'
				)
			}

			if (validateJob) {
				const page1Data = register?.Entry?.AnswersJson?.page1
				console.log('page1Data', page1Data)
				if (!page1Data?.newBarSec) {
					await this.serviceRegister.updateScaffTag(page1Data)
				} else if (page1Data?.newBarSec) {
					await this.serviceRegister.createNewTag(page1Data)
				}

				await this.appenateService.updateRegisterTable(page1Data)

				return new ResponseModel<Register>(
					200,
					undefined,
					'Scaffold register created successfully'
				)
			}

			return new ResponseModel<Register>(404, undefined, 'Jobs Id doesnt exist')
		} catch (error) {
			return new ResponseModel<Register>(502, undefined, error.message)
		}
	}
	async updateRegister(
		id: string,
		register: Register
	): Promise<ResponseModel<Register>> {
		try {
			const response = await this.serviceRegister.update(id, register)

			await this.appenateService.updateRegisterTable({ id, ...register })

			return new ResponseModel<Register>(200, response)
		} catch (error) {
			return new ResponseModel<Register>(501, undefined, error.message)
		}
	}
}
