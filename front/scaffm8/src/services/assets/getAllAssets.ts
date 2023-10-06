import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useAssets = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllAssets = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverAssetsRoutes.getAllAssets
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Assets')
			throw new Error('Something went wrong getting Assets')
		}
	}

	const { data, isLoading, error } = useQuery(['assets'], fetchAllAssets)

	return { data, isLoading, error }
}
