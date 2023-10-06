import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'

export const useVehicles = () => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllVehicles = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverVehicleRoutes.getAllVehicles
			)

			const newValues = response.data.map(
				(vehicle: {
					RegoDue: string
					WOFDate: string
					ServiceDueDate: string
				}) => {
					return {
						...vehicle,
						RegoDue_date: moment(vehicle.RegoDue, 'DD/MM/YYYY').toDate(),
						WOFDate_date: moment(vehicle.WOFDate, 'DD/MM/YYYY').toDate(),
						ServiceDueDate_date: moment(
							vehicle.ServiceDueDate,
							'DD/MM/YYYY'
						).toDate(),
					}
				}
			)

			return newValues
		} catch (error) {
			showError('Something went wrong getting Vehicles')
			throw new Error('Something went wrong getting Vehicles')
		}
	}

	const { data, isLoading, error } = useQuery(['vehicles'], fetchAllVehicles)

	return { data, isLoading, error }
}
