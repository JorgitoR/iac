import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateEDInvoice = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateEdInvoice = async (
		invoice_id: string | number,
		edinvoice: unknown
	) => {
		try {
			const response = await postRequest(
				AppRoutes.serverInvoiceRoutes.updateEdinvoice,
				edinvoice,
				invoice_id
			)
			queryClient.refetchQueries(['invoices'])
			showSuccess('edInvoice Updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating the edInvoice')
			throw new Error((error as Error).message)
		}
	}

	return { updateEdInvoice }
}
