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

@Injectable()
export class RegisterUseCase implements IRegisterService {
	constructor(
		@Inject('IRegisterRepository')
		private readonly serviceRegister: IRegisterRepository
	) {}
	async getAllRegister(): Promise<ResponseModel<Object>> {
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
		register: Register
	): Promise<ResponseModel<Register>> {
		try {
			const validateJob = await this.serviceRegister.validateJobs(
				register.job_id
			)
			const validateTag = await this.serviceRegister.validateTag(
				register.tag_no
			)

			if (validateTag) {
				return new ResponseModel<Register>(
					400,
					undefined,
					'Tag_no is unique and already exist'
				)
			}

			if (validateJob) {
				const response = await this.serviceRegister.save(register)
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
	): Promise<ResponseModel<Object>> {
		try {
			const response = await this.serviceRegister.update(id, register)
			return new ResponseModel<Object>(200, response)
		} catch (error) {
			return new ResponseModel<Object>(501, undefined, error.message)
		}
	}
}
