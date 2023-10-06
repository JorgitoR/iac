import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateWeeklyHireInvoice = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateWeeklyHire = async (
		invoice_id: string | number,
		hireInvoice: unknown
	) => {
		try {
			const response = await postRequest(
				AppRoutes.serverInvoiceRoutes.updateWeeklyInvoice,
				hireInvoice,
				invoice_id
			)
			queryClient.refetchQueries(['invoices'])
			showSuccess('Weekly Hire Invoice Updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating the Weekly Hire Invoice')
			throw new Error((error as Error).message)
		}
	}

	return { updateWeeklyHire }
}
