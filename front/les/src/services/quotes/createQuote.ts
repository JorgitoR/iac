import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import { IQuoteForm } from 'models'

export const useCreateQuote = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createQuote = async (quote: IQuoteForm) => {
		try {
			delete quote.quote_num
			const response = await putRequest(
				AppRoutes.serverQuoteRoutes.createQuote,
				quote
			)

			showSuccess('Quote created successfully')
			queryClient.refetchQueries(['quotes'])
			return response.data
		} catch (error) {
			showError((error as Error).message)
			throw new Error((error as Error).message)
		}
	}
	return { createQuote }
}
