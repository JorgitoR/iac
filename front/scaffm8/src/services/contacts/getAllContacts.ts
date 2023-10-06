import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { useQuery } from '@tanstack/react-query'
import { AppRoutes } from 'config'

export const useContacts = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchContacts = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverContactRoutes.getAllContacts
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Contacts')
			throw new Error('Something went wrong getting Contacts')
		}
	}

	const { data, isLoading, error } = useQuery(['AllContacts'], fetchContacts)

	return { data, isLoading, error }
}
