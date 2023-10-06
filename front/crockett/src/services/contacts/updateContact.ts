import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateContact = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateContact = async (Contact: unknown, client_id: number) => {
		try {
			const response = await postRequest(
				AppRoutes.serverContactRoutes.updateContact,
				Contact,
				client_id
			)
			queryClient.refetchQueries(['client_contacts'])
			showSuccess('Contact updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong when updating a contact')
			throw new Error((error as Error).message)
		}
	}
	return { updateContact }
}
