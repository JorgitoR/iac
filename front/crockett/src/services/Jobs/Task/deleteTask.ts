import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'

export const useDeleteJobTask = () => {
	const { showError, showSuccess } = useContext(NotificationsContext)
	const { deleteRequest } = useApi()

	const deleteTask = async (task_id: number) => {
		try {
			const response = await deleteRequest(
				AppRoutes.serverJobsRoutes.deleteTask,
				task_id
			)
			showSuccess('Task removed successfully')
			return response.data
		} catch (error) {
			showError('Something went wrong when removing the task')
			throw new Error('Something went wrong when removing the task')
		}
	}

	return { deleteTask }
}
