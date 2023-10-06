import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { useQuery } from '@tanstack/react-query'
import { AppRoutes } from 'config'

export const useContactsById = (contact_id?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchContactByID = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverContactRoutes.getContact,
				contact_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Contact')
			throw new Error('Something went wrong getting Contact')
		}
	}

	if (!contact_id) {
		return { data: [], isLoading: false, error: null }
	}

	const { data, isLoading, error } = useQuery(['contact'], fetchContactByID)

	return { data, isLoading, error }
}
