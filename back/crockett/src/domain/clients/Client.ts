export class Client {
	readonly id?: number
	readonly client_name: string
	readonly site: string
	readonly phone: string
	readonly email: string
	readonly status: string

	constructor(
		id: number,
		client_name: string,
		site: string,
		phone: string,
		email: string,
		status: string
	) {
		this.id = id
		this.client_name = client_name
		this.site = site
		this.phone = phone
		this.email = email
		this.status = status
	}
}
