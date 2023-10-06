import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateVariationTask = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const createVariationTask = async (id: number | string, task: any) => {
		try {
			const response = await putRequest(
				AppRoutes.serverJobsRoutes.createVariationTask,
				task,
				id
			)
			queryClient.refetchQueries(['tasks'])
			showSuccess('Variation Task created successfully')
			return response
		} catch (error) {
			console.log(error)
			showError('Something went wrong creating the Variation Task')
			throw new Error((error as Error).message)
		}
	}
	return { createVariationTask }
}
