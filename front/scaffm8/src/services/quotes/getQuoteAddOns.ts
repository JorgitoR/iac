import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useQuoteAddonsById = (quoteId?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchQuoteAddOnsById = async (quoteId?: number) => {
		try {
			const response = await getRequest(
				AppRoutes.serverQuoteRoutes.quote_addons,
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
			fetchQuoteAddOnsById,
		}
	}

	const { data, isLoading, error } = useQuery(['quote_addons', quoteId], () =>
		fetchQuoteAddOnsById(quoteId)
	)

	return { data, isLoading, error }
}
