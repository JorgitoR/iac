import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useDeleteEDInvoice = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { deleteRequest } = useApi()
	const queryClient = useQueryClient()

	const deleteEdInvoice = async (invoice_id: string | number) => {
		try {
			const response = await deleteRequest(
				AppRoutes.serverInvoiceRoutes.deleteEdinvoice,
				invoice_id
			)
			queryClient.refetchQueries(['invoices'])
			showSuccess('edInvoice Deleted successfully')
			return response
		} catch (error) {
			showError('Something went wrong deleting the edInvoice')
			throw new Error((error as Error).message)
		}
	}

	return { deleteEdInvoice }
}
