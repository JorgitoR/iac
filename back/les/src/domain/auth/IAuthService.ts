import { User, EditUser } from './Auth'
import { ResponseModel } from '../responseModel'

export interface IAuthService {
	createUser(user: User): Promise<ResponseModel<{ created: boolean }>>
	login(
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
	>
	updateUserByStaffId(
		id: number,
		user: EditUser
	): Promise<ResponseModel<{ updated: boolean }>>
	sendInvitation(email: string): Promise<{
		sended: boolean
	}>

	resetPassword(
		password: string,
		token: string
	): Promise<ResponseModel<{ updated: boolean }>>

	validateTokenPassword(
		token: string
	): Promise<ResponseModel<{ valid: boolean }>>
	requestPasswordReset(email: string): Promise<{ sended: boolean }>
}
