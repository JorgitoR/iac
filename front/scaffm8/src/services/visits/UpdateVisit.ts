import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateVisit = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateVisit = async (visit_id: string | number, visit: unknown) => {
		try {
			const response = await postRequest(
				AppRoutes.serverVisitRoutes.updateVisit,
				visit,
				visit_id
			)
			queryClient.refetchQueries(['visits'])
			showSuccess('Visit updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating the visit')
			throw new Error((error as Error).message)
		}
	}

	return { updateVisit }
}
