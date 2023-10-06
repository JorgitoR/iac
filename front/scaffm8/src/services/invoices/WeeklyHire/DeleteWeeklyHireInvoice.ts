import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useDeleteWeeklyHireInvoice = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { deleteRequest } = useApi()
	const queryClient = useQueryClient()

	const deleteWeeklyHireInvoice = async (invoice_id: string | number) => {
		try {
			const response = await deleteRequest(
				AppRoutes.serverInvoiceRoutes.deleteWeeklyInvoice,
				invoice_id
			)
			queryClient.refetchQueries(['invoices'])
			showSuccess('Weekly Hire Invoice Deleted successfully')
			return response
		} catch (error) {
			showError('Something went wrong deleting the Weekly Hire Invoice')
			throw new Error((error as Error).message)
		}
	}

	return { deleteWeeklyHireInvoice }
}
