import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useVisitById = (Visit_id?: string | number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchVisitById = async () => {
		try {
			if (!Visit_id) return null
			const response = await getRequest(
				AppRoutes.serverVisitRoutes.getVisit,
				Visit_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Visit')
			throw new Error('Something went wrong getting Visit')
		}
	}

	const { data, isLoading, error } = useQuery(
		['visit', Visit_id],
		fetchVisitById
	)

	return { data, isLoading, error }
}
