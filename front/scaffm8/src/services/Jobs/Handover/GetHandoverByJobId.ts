import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useHandoverByJobId = (job_id?: number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	if (!job_id) {
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
		}
	}

	const fetchHandOverByJobById = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverJobsRoutes.getHandoverByJobId,
				job_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Handover')
			throw new Error('Something went wrong getting Handover')
		}
	}

	const { data, isLoading, error } = useQuery(
		['job_handover', job_id],
		fetchHandOverByJobById
	)

	return { data, isLoading, error }
}
