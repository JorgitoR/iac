export class ModelToken {
	id: number
	token: string
	userName: string
	email: string
	userType: string
	tokenType: string
	accessFrom: string

	constructor(
		token: string,
		userName: string,
		email: string,
		userType: string
	) {
		this.token = token
		this.userName = userName
		this.email = email
		this.userType = userType
	}
}

export interface ILoginRespose {
	token: string
	userName: string
	email: string
	userType: string
	loginFrom: string
}
