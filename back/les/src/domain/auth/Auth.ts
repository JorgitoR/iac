export class User {
	readonly id?: number
	readonly username: string
	readonly email: string
	readonly password: string
	readonly userType: string
	readonly login_attempts: number
	readonly blocked: boolean
	readonly status: string
	readonly accessPortal: string
	readonly accessMobile: string
	readonly staff_id: number
	constructor(
		id: number,
		username: string,
		email: string,
		password: string,
		userType: string,
		login_attempts: number,
		blocked: boolean,
		status: string,
		accessPortal: string,
		accessMobile: string,
		staff_id: number
	) {
		this.id = id
		this.username = username
		this.email = email
		this.password = password
		this.userType = userType
		this.login_attempts = login_attempts
		this.blocked = blocked
		this.status = status
		this.accessPortal = accessPortal
		this.accessMobile = accessMobile
		this.staff_id = staff_id
	}
}

export class EditUser {
	readonly username?: string
	readonly email?: string
	readonly userType?: string
	readonly status?: string
	readonly accessPortal?: string
	readonly accessMobile?: string
	readonly pin?: string
	constructor(
		username?: string,
		email?: string,
		userType?: string,
		status?: string,
		accessPortal?: string,
		accessMobile?: string,
		pin?: string
	) {
		this.username = username
		this.email = email
		this.userType = userType
		this.status = status
		this.accessPortal = accessPortal
		this.accessMobile = accessMobile
		this.pin = pin
	}
}
