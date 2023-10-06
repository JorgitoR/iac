import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { useQuery } from '@tanstack/react-query'
import { AppRoutes } from 'config'

export const useContactsByClientId = (client_id?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchContactsByClientID = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverContactRoutes.getContactsByClientID,
				client_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Contacts')
			throw new Error('Something went wrong getting Contacts')
		}
	}

	if (!client_id) {
		return { data: [], isLoading: false, error: null }
	}

	const { data, isLoading, error } = useQuery(
		['client_contacts'],
		fetchContactsByClientID
	)

	return { data, isLoading, error }
}
