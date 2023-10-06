export class ResponseModel<T> {
	public code: number
	public data?: T
	public message?: string

	constructor(code: number, data?: T, message?: string) {
		this.code = code
		this.data = data
		this.message = message
	}
}
