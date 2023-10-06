import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import {
	User,
	IAuthRepository,
	IAuthService,
	ILoginRespose,
	EditUser,
} from 'domain/auth'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		@Inject('IAuthRepository')
		private readonly authRepository: IAuthRepository
	) {}
	async login(
		email: string,
		password: string
	): Promise<
		ResponseModel<{
			token
			userName: string
			email: string
			userType: string
			loginFrom: string
		}>
	> {
		const userData = await this.authRepository.getByEmail(email)
		if (userData == null) {
			throw new UnauthorizedException({
				code: 401,
				data: null,
				message: 'User or password incorrect',
			})
		}
		const passwordMatch = await this.authRepository.comparePassword(
			email,
			password
		)
		if (!passwordMatch) {
			await this.authRepository.increaselogin_attempts(userData.id)
			throw new UnauthorizedException({
				code: 401,
				data: null,
				message: 'User or password incorrect',
			})
		}

		if (userData.blocked) {
			throw new UnauthorizedException({
				code: 401,
				data: null,
				message: 'User blocked, use forgot password to unblock',
			})
		}

		this.authRepository.update(userData.id, {
			...userData,
			login_attempts: 0,
		})

		const token = await this.authRepository.generateToken(
			userData,
			'access_token',
			'web'
		)
		const response: ILoginRespose = {
			token,
			userName: userData.username,
			email: userData.email,
			userType: userData.userType,
			loginFrom: 'web',
		}

		return Promise.resolve({
			code: 200,
			data: response,
			message: 'User logged',
		})
	}
	async resetPassword(
		password: string,
		token: string
	): Promise<ResponseModel<{ updated: boolean }>> {
		const isValidToken_password = await this.authRepository.validateToken(
			token,
			'password_token'
		)
		const isValidToken_access = await this.authRepository.validateToken(
			token,
			'access_token'
		)

		if (!isValidToken_password && !isValidToken_access) {
			throw new UnauthorizedException({
				code: 401,
				data: null,
				message: 'The Token Provided is not valid',
			})
		}
		const decodedToken = await this.authRepository.decodeToken(token)

		const userId = decodedToken['id']

		const userData = await this.authRepository.getById(userId)

		if (userData == null) {
			throw new UnauthorizedException({
				code: 401,
				data: null,
				message: 'The Token Provided is not valid',
			})
		}
		const hashedPassword = await this.authRepository.hashPassword(password)
		const updated = await this.authRepository.update(userId, {
			...userData,
			password: hashedPassword,
			login_attempts: 0,
			blocked: false,
		})

		if (!updated) {
			throw new UnauthorizedException({
				code: 500,
				data: null,
				message: 'Something went wrong, try again later',
			})
		}

		return Promise.resolve({
			code: 200,
			data: null,
			message: 'Password changed',
		})
	}
	async updateUserByStaffId(
		staff_id: number,
		user: EditUser
	): Promise<ResponseModel<{ updated: boolean }>> {
		const userExists = await this.authRepository.getUserByStaffId(staff_id)

		if (!userExists) {
			throw new NotFoundException({
				code: 404,
				data: null,
				message: 'User not found',
			})
		}
		const updated = await this.authRepository.update(userExists.id, user)
		if (!updated) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Something went wrong, try again later',
			})
		}
		return Promise.resolve({
			code: 200,
			data: null,
			message: 'User updated',
		})
	}
	async sendInvitation(email: string): Promise<{ sended: boolean }> {
		const user = await this.authRepository.getByEmail(email)
		const token = await this.authRepository.generateToken(
			user,
			'password_token',
			'web'
		)
		const resultEmail = await this.authRepository.sendInvitationEmail(
			user,
			token
		)
		return Promise.resolve({ sended: resultEmail })
	}
	async createUser(
		userData: User
	): Promise<ResponseModel<{ created: boolean }>> {
		try {
			const randomPassword = Math.random().toString(36).slice(-8)
			const hashedPassword = await this.authRepository.hashPassword(
				randomPassword
			)
			const user = {
				...userData,
				password: hashedPassword,
			}
			const createdUser = await this.authRepository.create(user as any)

			return Promise.resolve({
				code: 200,
				data: createdUser,
				message: 'User created',
			})
		} catch (error) {
			throw new InternalServerErrorException({
				code: 500,
				data: false,
				message: 'Something went wrong, try again later',
			})
		}
	}
	getUserByEmail(email: string): Promise<ResponseModel<User>> {
		throw new Error('Method not implemented.')
	}
	getUserById(email: string): Promise<ResponseModel<User>> {
		throw new Error('Method not implemented.')
	}
	updateRegister(
		id: string,
		register: User
	): Promise<ResponseModel<{ updated: boolean }>> {
		throw new Error('Method not implemented.')
	}
	validateTokenPassword(
		token: string
	): Promise<ResponseModel<{ valid: boolean }>> {
		const isValitToken = this.authRepository.validateToken(
			token,
			'password_token'
		)
		if (!isValitToken) {
			throw new UnauthorizedException({
				code: 401,
				data: { valid: false },
				message: 'The Token Provided is not valid',
			})
		}
		return Promise.resolve({
			code: 200,
			data: { valid: true },
			message: 'Token is valid',
		})
	}
	async requestPasswordReset(email: string): Promise<{ sended: boolean }> {
		const userData = await this.authRepository.getByEmail(email)
		if (userData == null) {
			throw new UnauthorizedException({
				code: 401,
				data: null,
				message: 'User not found',
			})
		}
		const token = await this.authRepository.generateToken(
			userData,
			'password_token',
			'web'
		)
		const sended = await this.authRepository.sendPasswordResetEmail(
			userData,
			token
		)
		if (!sended) {
			throw new InternalServerErrorException({
				code: 500,
				data: null,
				message: 'Something went wrong, try again later',
			})
		}
		return Promise.resolve({ sended: true })
	}
}
