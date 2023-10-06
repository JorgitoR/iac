import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

interface IemailData {
	subject: string
	email: string
	body: string
	quoteId: number
}

export const useSendQuote = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const sendEmail = async (emailData: IemailData) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.sendQuoteEmail,
				emailData,
				emailData.quoteId
			)
			showSuccess('Quote Email Sended successfully')
			queryClient.refetchQueries(['quotes'])
			queryClient.refetchQueries(['quote', emailData.quoteId])
			return response
		} catch (error) {
			showError('Something went wrong Sending the Quote')
			throw new Error('Something went wrong Sending the Quote')
		}
	}

	const markAsPending = async (quoteId: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverQuoteRoutes.markAsPendingEmail,
				{},
				quoteId
			)
			showSuccess('Quote Marked as Pending successfully')
			queryClient.refetchQueries(['quotes'])
			queryClient.refetchQueries(['quote', quoteId])
			return response
		} catch (error) {
			showError('Something went wrong Marking as Pending the Quote')
			throw new Error('Something went wrong Marking as Pending the Quote')
		}
	}

	return {
		sendEmail,
		markAsPending,
	}
}
