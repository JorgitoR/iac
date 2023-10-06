import { useContext } from 'react'
import moment from 'moment'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useVisits = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllVisits = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverVisitRoutes.getAllVisits
			)
			const newData = response.data.map((visit: { date: string }) => {
				return {
					...visit,
					visitDate: moment(visit.date, 'DD/MM/YYYY').utc(),
				}
			})
			return newData
		} catch (error) {
			showError('Something went wrong getting Visits')
			throw new Error('Something went wrong getting Visits')
		}
	}

	const { data, isLoading, error } = useQuery(['visits'], fetchAllVisits)

	return { data, isLoading, error }
}
