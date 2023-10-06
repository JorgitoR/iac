import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'

export const useUpdateJobTask = () => {
	const { showError, showSuccess } = useContext(NotificationsContext)
	const { postRequest } = useApi()

	const udpateTask = async (id: number, data: unknown) => {
		try {
			const response = await postRequest(
				AppRoutes.serverJobsRoutes.updateTask,
				data,
				id
			)
			showSuccess('Task updated successfully')
			return response.data
		} catch (error) {
			showError('Something went wrong when updating the task')
			throw new Error('Something went wrong updating Task')
		}
	}

	return { udpateTask }
}
