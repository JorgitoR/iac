import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import {
	IQuoteLine,
	IQuoteAdditionalLines,
	IQuoteZones,
	IRates,
	QuoteDataToUpdate,
} from 'models'

export const useUpdateQuote = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateQuote = async (quote: QuoteDataToUpdate, id: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.updateQuote,
				quote,
				id
			)
			showSuccess('Quote updated successfully')
			queryClient.refetchQueries(['quotes'])
			queryClient.refetchQueries(['quote', id])
			return response
		} catch (error) {
			showError('Something went wrong updating Quote')
			throw new Error('Something went wrong updating Quote')
		}
	}

	const updateQuoteLines = async (quote_lines: IQuoteLine[], id: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.quote_lines,
				quote_lines,
				id
			)
			showSuccess('Quote updated successfully')
			queryClient.refetchQueries(['quote_lines', id])
			return response
		} catch (error) {
			showError('Something went wrong updating Quote Lines')
			throw new Error('Something went wrong updating Quote Lines')
		}
	}

	const updateQuoteAddOns = async (
		quote_addons: IQuoteAdditionalLines[],
		id: number
	) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.quote_addons,
				quote_addons,
				id
			)
			showSuccess('Quote Additional Items updated successfully')
			queryClient.refetchQueries(['quote_addons', id])
			return response
		} catch (error) {
			showError('Something went wrong updating Quote Additional Items')
			throw new Error('Something went wrong updating Quote Additional Items')
		}
	}

	const updateQuoteZones = async (quote_zones: IQuoteZones[], id: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.quote_zones,
				quote_zones,
				id
			)
			showSuccess('Quote Zones updated successfully')
			queryClient.refetchQueries(['quote_zones', id])
			return response
		} catch (error) {
			showError('Something went wrong updating Quote Zones')
			throw new Error('Something went wrong updating Quote Zones')
		}
	}

	const updateQuoteRates = async (quote_rates: IRates[], id: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.quote_rates,
				quote_rates,
				id
			)
			showSuccess('Quote Rates updated successfully')
			queryClient.refetchQueries(['quote_rates', id])
			return response
		} catch (error) {
			showError('Something went wrong updating Quote Rates')
			throw new Error('Something went wrong updating Quote Rates')
		}
	}

	return {
		updateQuote,
		updateQuoteLines,
		updateQuoteAddOns,
		updateQuoteZones,
		updateQuoteRates,
	}
}
