import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useTask = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllTask = async () => {
		try {
			const response = await getRequest(AppRoutes.serverJobsRoutes.getAllTask)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Task')
			throw new Error('Something went wrong getting Task')
		}
	}

	const { data, isLoading, error } = useQuery(['task'], fetchAllTask)

	return { data, isLoading, error }
}
