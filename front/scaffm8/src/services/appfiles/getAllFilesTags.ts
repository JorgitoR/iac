import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useAppFilesTags = (id: number | string) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllAppFiles = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverAppFilesRoutes.getAppFilesScaffoldRegister,
				id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting the App Files')
			throw new Error('Something went wrong getting the App Files')
		}
	}

	if (!id) {
		return {
			data: null,
			isLoading: false,
			error: null,
		}
	}

	const { data, isLoading, error } = useQuery(['app_files'], fetchAllAppFiles)

	return { data, isLoading, error }
}
