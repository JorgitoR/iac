import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useJobTaskById = (task_id?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchTaskById = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverJobsRoutes.getTask,
				task_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Task')
			throw new Error('Something went wrong getting Task')
		}
	}

	if (!fetchTaskById) {
		return { data: undefined, isLoading: undefined, error: undefined }
	}

	const { data, isLoading, error } = useQuery(['task', task_id], fetchTaskById)

	return { data, isLoading, error }
}
