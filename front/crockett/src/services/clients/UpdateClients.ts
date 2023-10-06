import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateClients = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateClient = async (Client: unknown, client_id: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverClientRoutes.updateClient,
				Client,
				client_id
			)
			queryClient.refetchQueries(['clients'])
			showSuccess('Client updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating Client')
		}
	}
	return { updateClient }
}
