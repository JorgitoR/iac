import { EditUser, User } from './Auth'

type ITokentType = 'access_token' | 'refresh_token' | 'password_token'
type IAccessFrom = 'web' | 'mobile' | 'password_reset'

export interface IAuthRepository {
	getById(id: number): Promise<User>
	getByEmail(email: string): Promise<User>
	getUserByStaffId(staffId: number): Promise<User>
	create(user: User): Promise<{ created: boolean }>
	update(id: number, user: User | EditUser): Promise<{ updated: boolean }>
	increaselogin_attempts(id: number): Promise<void>
	hashPassword(password: string): Promise<string>
	comparePassword(email: string, password: string): Promise<boolean>
	generateToken(
		user: User,
		tokenType: ITokentType,
		accessFrom: IAccessFrom
	): Promise<string>
	validateToken(token: string, tokenType: ITokentType): Promise<boolean>
	decodeToken(token: string): Promise<object>
	sendPasswordResetEmail(user: User, token: string): Promise<boolean>
	sendInvitationEmail(user: User, token: string): Promise<boolean>
}
