import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import queryClient from 'context/queryClient'

export const useUpdateHandover = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()

	const update = async (id: number, body: unknown, successMessage: string) => {
		try {
			const response = await postRequest(
				AppRoutes.serverJobsRoutes.updateHandover,
				body,
				id
			)
			queryClient.invalidateQueries()
			showSuccess(successMessage)
			return response
		} catch (error) {
			showError('Document creation failed. Please try again')
			throw new Error((error as Error).message)
		}
	}
	return { update }
}
