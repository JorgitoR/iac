import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateContact = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createContact = async (Contact: unknown) => {
		try {
			const response = await putRequest(
				AppRoutes.serverContactRoutes.createContact,
				Contact
			)
			queryClient.refetchQueries(['client_contacts'])
			queryClient.invalidateQueries()
			showSuccess('Contact created successfully')
			return response
		} catch (error) {
			showError('Something went wrong when creating a contact')
			throw new Error((error as Error).message)
		}
	}
	return { createContact }
}
