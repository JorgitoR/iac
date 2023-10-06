import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useVehicleById = (vehicle_id?: string | number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchVehicleById = async () => {
		try {
			if (!vehicle_id) return null
			const response = await getRequest(
				AppRoutes.serverVehicleRoutes.getVehicle,
				vehicle_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Vehicle')
			throw new Error('Something went wrong getting Vehicle')
		}
	}

	const { data, isLoading, error } = useQuery(
		['vehicle', vehicle_id],
		fetchVehicleById
	)

	return { data, isLoading, error }
}
