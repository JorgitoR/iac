import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateEDInvoice = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createEdInvoice = async (
		job_id: string | number,
		edinvoice: {
			zone: string | number
			zone_label: string
			type: string
			Descripcion: string
			complete_percent: number
			total: number
		}
	) => {
		try {
			const response = await putRequest(
				AppRoutes.serverInvoiceRoutes.createEdinvoice,
				edinvoice,
				job_id
			)
			queryClient.refetchQueries(['invoices'])
			queryClient.refetchQueries(['ed_invoices', job_id])
			showSuccess('edInvoice Created successfully')
			return response
		} catch (error) {
			showError('Something went wrong creating the edInvoice')
			throw new Error((error as Error).message)
		}
	}

	return { createEdInvoice }
}
