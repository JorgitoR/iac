import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useClients = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllClients = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverClientRoutes.getAllClients
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Clients')
			throw new Error('Something went wrong getting Clients')
		}
	}

	const { data, isLoading, error } = useQuery(['clients'], fetchAllClients)

	return { data, isLoading, error }
}
