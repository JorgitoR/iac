import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useQuoteZonesById = (quoteId?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchQuoteZonesById = async (quoteId: number) => {
		try {
			const response = await getRequest(
				AppRoutes.serverQuoteRoutes.quote_zones,
				quoteId
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting quote zones')
			throw new Error('Something went wrong getting quote zones')
		}
	}

	if (!quoteId) {
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
			fetchQuoteZonesById,
		}
	}

	const { data, isLoading, error } = useQuery(['quote_zones', quoteId], () =>
		fetchQuoteZonesById(quoteId)
	)

	return { data, isLoading, error }
}
