import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useTimesheets = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllTimesheets = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverTimesheetRoutes.getAllTimesheets
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Timesheets')
			throw new Error('Something went wrong getting Timesheets')
		}
	}

	const { data, isLoading, error } = useQuery(
		['timesheets'],
		fetchAllTimesheets
	)

	return { data, isLoading, error }
}
