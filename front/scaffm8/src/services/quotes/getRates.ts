import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useQuoteRatesById = (quoteId?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchQuoteRatesById = async (quoteId: number) => {
		try {
			const response = await getRequest(
				AppRoutes.serverQuoteRoutes.quote_rates,
				quoteId
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting quote Rates')
			throw new Error('Something went wrong getting quote Rates')
		}
	}

	if (!quoteId) {
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
			fetchQuoteRatesById,
		}
	}

	const { data, isLoading, error } = useQuery(['quote_rates', quoteId], () =>
		fetchQuoteRatesById(quoteId)
	)

	return { data, isLoading, error }
}
