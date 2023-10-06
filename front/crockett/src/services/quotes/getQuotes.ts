import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useQuotes = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchQuotes = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverQuoteRoutes.getAllQuotes
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting quotes')
			throw new Error('Something went wrong getting quotes')
		}
	}

	const { data, isLoading, error } = useQuery(['quotes'], fetchQuotes)

	return { data, isLoading, error }
}
