import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { useQuery } from '@tanstack/react-query'
import { AppRoutes } from 'config'

export const useClientById = (client_id?: string | number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchClient = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverClientRoutes.getClient,
				client_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Clients')
			throw new Error('Something went wrong getting Clients')
		}
	}

	if (!client_id)
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
		}

	const { data, isLoading, error } = useQuery(
		['clients', client_id],
		fetchClient
	)

	return { data, isLoading, error }
}
