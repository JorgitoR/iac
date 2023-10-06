import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateJob = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const update = async (id: number, job: any) => {
		try {
			const response = await postRequest(
				AppRoutes.serverJobsRoutes.updateJob,
				job,
				id
			)
			queryClient.refetchQueries(['jobs'])
			showSuccess('Job updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating the job')
			throw new Error((error as Error).message)
		}
	}
	return { update }
}
