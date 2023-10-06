import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateClients = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createClient = async (Client: unknown) => {
		try {
			const response = await putRequest(
				AppRoutes.serverClientRoutes.createClient,
				Client
			)
			queryClient.refetchQueries(['clients'])
			showSuccess('Client created successfully')
			return response.data
		} catch (error) {
			showError((error as Error).message)
			throw new Error((error as Error).message)
		}
	}
	return { createClient }
}
