import { AppConfig } from 'config'
import { useSelector } from 'react-redux'
import { AppStore } from 'redux/store'

interface HttpHeader {
	[key: string]: string
}

/* interface serverResponse {
	message: string
	data: unknown
	code: number
} */

interface queryParam {
	[key: string]: string | number | boolean | undefined
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const useApi = () => {
	const userState = useSelector((store: AppStore) => store.user)
	const { accessToken } = userState

	const fetchData = async (
		url: string,
		method: HttpMethod,
		body?: unknown | null
	) => {
		const headers: HttpHeader = {
			'Content-Type': 'application/json',
		}
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`
		}

		let requestBody = null
		if (body != null) {
			requestBody = JSON.stringify(body)
		}

		const res = await fetch(`${AppConfig.urlBackend}/${url}`, {
			method,
			headers,
			body: requestBody,
		})

		if (res.ok) {
			const data = await res.json()
			return data
		} else if (res.status === 0) {
			throw new Error('Request was cancelled')
		} else {
			const errorMessage = JSON.parse(await res.text()).message
			throw new Error(errorMessage)
		}
	}

	const makeUrl = (url: string, id?: string | number) => {
		let queryUrl = url
		if (id) {
			queryUrl = queryUrl.replace(/:id/, `${id}`)
		}
		return queryUrl
	}

	const getRequest = async (
		url: string,
		id?: string | number,
		queryObj?: queryParam
	) => {
		const queryUrl = makeUrl(url, id)
		if (queryObj) {
			const queryParams: string = Object.keys(queryObj)
				.map((key, index) => `${key}=${encodeURIComponent(queryParams[index])}`)
				.join('&')
		}
		return fetchData(queryUrl, 'GET')
	}

	const postRequest = async (
		url: string,
		body?: unknown | null,
		id?: string | number
	) => {
		const queryUrl = makeUrl(url, id)
		return fetchData(queryUrl, 'POST', body)
	}

	const putRequest = async (
		url: string,
		body?: unknown | null,
		id?: string | number
	) => {
		const queryUrl = makeUrl(url, id)
		return fetchData(queryUrl, 'PUT', body)
	}

	const deleteRequest = async (url: string, id: string | number) => {
		const queryUrl = makeUrl(url, id)
		return fetchData(queryUrl, 'DELETE')
	}

	return { getRequest, postRequest, putRequest, deleteRequest }
}

export default useApi
