import { Client } from 'domain/clients'

export class Contact {
	readonly id?: number
	readonly client_id: number
	readonly email: string
	readonly phone: string
	readonly status: string
	readonly name: string
	readonly client: Client

	constructor(
		id: number,
		client_id: number,
		email: string,
		phone: string,
		status: string,
		name: string,
		client: Client
	) {
		this.id = id
		this.client_id = client_id
		this.email = email
		this.phone = phone
		this.status = status
		this.name = name
		this.client = client
	}
}
