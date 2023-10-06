import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useVisitsByJobId = (job_id?: string | number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchVisitsByJobId = async () => {
		try {
			if (!job_id) return null
			const response = await getRequest(
				AppRoutes.serverVisitRoutes.getVisitByJobId,
				job_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Visits')
			throw new Error('Something went wrong getting Visits')
		}
	}

	const { data, isLoading, error } = useQuery(
		['visits_job', job_id],
		fetchVisitsByJobId
	)

	return { data, isLoading, error }
}
