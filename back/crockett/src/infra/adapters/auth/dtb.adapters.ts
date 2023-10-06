import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable, Inject } from '@nestjs/common'
import { IAuthRepository, ModelToken, User } from 'domain/auth'
import { PostgresAdapter, User as UserDb } from 'infra/database'
import { SmtpAdapter } from 'infra/smtp'
import { ConfigService } from '@nestjs/config'

type ITokentType = 'access' | 'refresh' | 'reset-password'

@Injectable()
export class AuthDtb implements IAuthRepository {
	constructor(
		@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter,
		@Inject(JwtService) private readonly jwtService: JwtService,
		@Inject(SmtpAdapter) private readonly smtp: SmtpAdapter,
		private readonly configService: ConfigService
	) {}
	sendPasswordResetEmail(user: User, token: string): Promise<boolean> {
		const urlFrontend = this.configService.get<string>('URL_FRONTEND')
		const url = `${urlFrontend}/changePassword/${token}`
		const subject = `Reset Your Password`
		const body = `Hello ${user.username}
		We have received a request to change your password
		<a href="${url}">Click here to change your password</a>
		if you did not request this change, please ignore this email.

		Regards, 
		The Crockett Team.
		`
			.split('\n')
			.join(' <br /> ')
		return this.smtp.sendMail(user.email, subject, body)
	}

	async sendInvitationEmail(user: User, token: string): Promise<boolean> {
		const urlFrontend = this.configService.get<string>('URL_FRONTEND')
		const url = `${urlFrontend}/changePassword/${token}`
		const subject = `Activate Your Account!`
		const body = ` Hello ${user.username}
		A ScaffM8 account has been created for you:
		<a href="${url}">Click here to set your password</a>
		This link will expire in 60 minutes
		
		Regards, 
		The Crockett Team.
		`
			.split('\n')
			.join(' <br /> ')
		const result = await this.smtp.sendMail(user.email, subject, body)
		return result.success
	}
	async getById(id: number): Promise<User> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const user = await db.model(UserDb).findByPk(id)
			if (user == null) {
				return null
			}
			const dataResult = user.toJSON() as User

			return Promise.resolve(dataResult)
		} catch (error) {
			return null
		}
	}
	async getUserByStaffId(staff_id: number): Promise<User> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const user = await db.model(UserDb).findOne({
				where: {
					staff_id: staff_id,
				},
			})

			if (user == null) {
				return null
			}

			const dataResult = user.toJSON() as User

			return Promise.resolve(dataResult)
		} catch (error) {
			return null
		}
	}
	async getByEmail(email: string): Promise<User> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const user = await db.model(UserDb).findOne({
				where: {
					email: email,
				},
			})

			if (user == null) {
				return null
			}

			const dataResult = user.toJSON() as User

			return Promise.resolve(dataResult)
		} catch (error) {
			return null
		}
	}
	create(user: User): Promise<{ created: boolean }> {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await this.dtb.getSequelizeInstance()
				const userDb = await db.model(UserDb).create(user as any)
				if (userDb == null) {
					return resolve({ created: false })
				}
				return resolve({ created: true })
			} catch (error) {
				return resolve({ created: false })
			}
		})
	}
	async update(id: number, user: User): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const userDb = await db.model(UserDb).findByPk(id)
			if (userDb == null) {
				return Promise.resolve({ updated: false })
			}
			await userDb.update(user)
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async hashPassword(password: string): Promise<string> {
		try {
			const hashedPassword = await bcrypt.hash(password, 10)
			return hashedPassword
		} catch (error) {
			return null
		}
	}
	async comparePassword(email: string, password: string): Promise<boolean> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const user = await db.model(UserDb).findOne({
				where: {
					email: email,
				},
			})
			if (user == null) {
				return Promise.resolve(false)
			}
			return bcrypt.compare(password, user.dataValues.password)
		} catch (error) {
			return Promise.resolve(false)
		}
	}
	async increaselogin_attempts(id: number): Promise<void> {
		const db = await this.dtb.getSequelizeInstance()
		const user = await db.model(UserDb).findByPk(id)
		if (user == null) {
			return
		}
		if (user.dataValues.login_attempts >= 3) {
		}
		const login_attempts = user.dataValues.login_attempts + 1

		await db.model(UserDb).update(
			{
				login_attempts: login_attempts,
			},
			{
				where: {
					id: id,
				},
			}
		)
		if (login_attempts >= 5) {
			await db.model(UserDb).update(
				{
					login_attempts: login_attempts,
					blocked: true,
				},
				{
					where: {
						id: id,
					},
				}
			)
		}
		return
	}
	async generateToken(
		user: User,
		tokenType: 'access_token' | 'refresh_token' | 'password_token',
		accessFrom: string
	): Promise<string> {
		const payload = {
			id: user.id,
			userName: user.username,
			email: user.email,
			userType: user.userType,
			tokenType: tokenType,
			accessFrom: accessFrom,
		}

		const token = this.jwtService.sign(payload, {
			expiresIn: tokenType == 'access_token' ? '1h' : '7d',
		})
		if (token == null) {
			return null
		}
		return Promise.resolve(token)
	}
	async validateToken(token: string, tokenType: string): Promise<boolean> {
		try {
			const payload = this.jwtService.verify(token)
			if (payload == null) {
				return Promise.resolve(false)
			}

			if (payload.tokenType != tokenType) {
				return Promise.resolve(false)
			}
			return Promise.resolve(true)
		} catch (error) {
			return Promise.resolve(false)
		}
	}
	async decodeToken(token: string): Promise<object> {
		try {
			const payload = this.jwtService.verify(token)
			if (payload == null) {
				return Promise.resolve(null)
			}
			return Promise.resolve(payload)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
}
