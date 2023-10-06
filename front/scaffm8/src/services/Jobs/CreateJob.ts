import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateJob = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const createJob = async (job: any) => {
		try {
			const response = await putRequest(
				AppRoutes.serverJobsRoutes.createJob,
				job
			)
			queryClient.refetchQueries(['jobs'])
			showSuccess('Job created successfully')
			return response
		} catch (error) {
			showError('Something went wrong creating the job')
			throw new Error((error as Error).message)
		}
	}
	return { createJob }
}
