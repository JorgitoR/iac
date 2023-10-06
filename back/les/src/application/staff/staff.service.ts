import {
	Injectable,
	Inject,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common'
import { IStaffService, Staff, IStaffRepository } from 'domain/staff'
import { ResponseModel } from 'domain/responseModel'
import { IAuthService } from 'domain/auth'
import { IAppenateService } from 'domain/appenate/IAppenateService'

@Injectable()
export class StaffService implements IStaffService {
	constructor(
		@Inject('IStaffRepository')
		private readonly staffRepository: IStaffRepository,
		@Inject('AuthService')
		private readonly authService: IAuthService,
		@Inject('IAppenateService')
		private readonly appenateService: IAppenateService
	) {}
	async getAll(): Promise<ResponseModel<Staff[]>> {
		const staff = await this.staffRepository.getAll()
		return {
			code: 200,
			data: staff,
			message: 'Staff list',
		}
	}
	async getById(id: number): Promise<ResponseModel<Staff>> {
		const staff = await this.staffRepository.getById(id)
		return {
			code: 200,
			data: staff,
			message: 'Staff list',
		}
	}
	async create(user: Staff): Promise<ResponseModel<{ created: boolean }>> {
		const emailExists = await this.staffRepository.validateStaffEmail(
			user.email
		)
		if (emailExists) {
			throw new ConflictException('Email already exists')
		}

		const staff = await this.staffRepository.create(user)
		const staffData = await this.staffRepository.getByEmail(user.email)
		if (staffData == null) {
			throw new InternalServerErrorException('Error creating staff')
		}
		const body = {
			accessPortal: user.accessToPortal,
			accessMobile: user.accessToMobile,
			blocked: false,
			email: user.email,
			login_attempts: 0,
			password: '',
			staff_id: staffData.id,
			status: 'Active',
			username: user.staff_name,
			userType: user.userType,
			pin: user.pin,
		}

		const userCreated = await this.authService.createUser(body)

		if (!userCreated) {
			throw new InternalServerErrorException('Error creating staff')
		}

		if (
			staffData.accessToPortal === 'Yes' ||
			staffData.accessToMobile === 'Yes'
		) {
			await this.authService.sendInvitation(staffData.email)
		}

		await this.appenateService.updateStaffTable(body)

		return {
			code: 200,
			data: { created: staff.created },
			message: 'Staff Create Operation',
		}
	}
	async update(
		id: number,
		staff: Staff
	): Promise<ResponseModel<{ updated: boolean }>> {
		const emailExists = await this.staffRepository.validateStaffEmail(
			staff.email
		)
		const currentStaff = await this.staffRepository.getById(id)
		if (currentStaff.email !== staff.email && emailExists) {
			throw new ConflictException('Email already exists')
		}
		const staffUpdated = await this.staffRepository.update(id, staff)
		if (!staffUpdated.updated) {
			throw new InternalServerErrorException('Error updating staff')
		}

		const staffData = await this.staffRepository.getById(id)

		const userUpdated = await this.authService.updateUserByStaffId(
			staffData.id,
			{
				accessPortal: staffData.accessToPortal,
				accessMobile: staffData.accessToMobile,
				status: staffData.status,
				username: staffData.staff_name,
				userType: staffData.userType,
				email: staffData.email,
				pin: staffData.pin,
			}
		)

		if (!userUpdated) {
			throw new InternalServerErrorException('Error updating staff')
		}

		await this.appenateService.updateStaffTable(staffData)

		return {
			code: 200,
			data: { updated: true },
			message: 'Staff Update Operation',
		}
	}
}
