import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IRates } from 'models'

export const useServiceRates = () => {
	const queryClient = useQueryClient()
	const { showError, showSuccess } = useContext(NotificationsContext)
	const { getRequest, postRequest } = useApi()

	const fetchServiceRates = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverQuoteRoutes.getServiceRates
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting service rates')
			throw new Error('Something went wrong getting service rates')
		}
	}

	const upsertRates = async (data: IRates[]) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.getServiceRates,
				{ rates: data }
			)
			showSuccess('Service rate created successfully')
			queryClient.refetchQueries(['serviceRates'])
			return response
		} catch (error) {
			console.log(error)
			showError('Something went wrong creating service rate')
			throw new Error('Something went wrong creating service rate')
		}
	}

	const { data, isLoading, error } = useQuery(
		['serviceRates'],
		fetchServiceRates
	)

	return { data, isLoading, error, upsertRates }
}
