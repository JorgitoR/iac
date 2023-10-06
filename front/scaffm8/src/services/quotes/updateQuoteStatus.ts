import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateQuoteStatus = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const declineQuote = async (id: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.declineQuote,
				{ status: 'Declined' },
				id
			)
			showSuccess('Quote updated successfully')
			queryClient.refetchQueries(['quotes'])
			queryClient.refetchQueries(['quote', id])
			return response
		} catch (error) {
			showError('Something went wrong updating the quote')
			throw new Error('Something went wrong updating the quote')
		}
	}

	const approveQuote = async (
		id: number,
		appovedBy: string,
		approveComment: string
	) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.approveQuote,
				{ appovedBy, approveComment },
				id
			)
			showSuccess('Quote Approved successfully')
			queryClient.refetchQueries(['quotes'])
			queryClient.refetchQueries(['quote', id])
			return response
		} catch (error) {
			showError('Something went wrong updating the quote')
			throw new Error('Something went wrong updating the quote')
		}
	}

	return {
		approveQuote,
		declineQuote,
	}
}
