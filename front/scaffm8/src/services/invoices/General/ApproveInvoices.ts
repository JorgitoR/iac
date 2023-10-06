import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useApproveInvoices = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const approveInvoices = async (
		invoices: {
			id: number
			invoiceType: string
		}[],
		dateCompleted: string,
		endOfMonth?: boolean
	) => {
		try {
			const response = await postRequest(
				AppRoutes.serverInvoiceRoutes.approveInvoices,
				{
					invoices,
					dateCompleted,
					endOfMonth,
				}
			)
			queryClient.refetchQueries(['invoices'])
			showSuccess('Invoices Approved successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating the Invoices')
			throw new Error((error as Error).message)
		}
	}

	return { approveInvoices }
}
