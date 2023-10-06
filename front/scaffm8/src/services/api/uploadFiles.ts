import { AppConfig, AppRoutes } from 'config'
import { useSelector } from 'react-redux'
import { AppStore } from 'redux/store'

interface HttpHeader {
	[key: string]: string
}

export const useFileUpload = () => {
	const userState = useSelector((store: AppStore) => store.user)
	const { accessToken } = userState

	const uploadFile = async (file: File, body?: unknown | null) => {
		const headers: HttpHeader = {} // No se necesita 'Content-Type' aquí

		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`
		}

		const formData = new FormData()

		if (body != null) {
			formData.append('metadata', JSON.stringify(body))
		}

		formData.append('file', file)

		const res = await fetch(
			`${AppConfig.urlBackend}/${AppRoutes.serverFilesRoutes.createFile}`,
			{
				method: 'POST',
				headers,
				body: formData,
			}
		)

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

	return { uploadFile }
}
