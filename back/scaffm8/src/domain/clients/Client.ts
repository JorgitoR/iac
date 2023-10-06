import { Contact } from 'domain/contacts'

export class Client {
	readonly id?: number
	readonly client_name: string
	readonly site: string
	readonly phone: string
	readonly email: string
	readonly status: string
	readonly mainContactData: Contact

	constructor(
		id: number,
		client_name: string,
		site: string,
		phone: string,
		email: string,
		status: string,
		mainContactData: Contact
	) {
		this.id = id
		this.client_name = client_name
		this.site = site
		this.phone = phone
		this.email = email
		this.status = status
		this.mainContactData = mainContactData
	}
}
