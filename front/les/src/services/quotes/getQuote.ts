import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useQuoteById = (quoteId?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchQuoteById = async (quoteId?: number) => {
		try {
			const response = await getRequest(
				AppRoutes.serverQuoteRoutes.getQuote,
				quoteId
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting quote')
			throw new Error('Something went wrong getting quote')
		}
	}

	if (!quoteId) {
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
			fetchQuoteById,
		}
	}

	const { data, isLoading, error } = useQuery(['quote', quoteId], () =>
		fetchQuoteById(quoteId)
	)

	return { data, isLoading, error }
}
