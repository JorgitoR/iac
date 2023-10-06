import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import { IStaffRow } from 'models/staff.model'

export const useCreateVehicle = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createVehicle = async (
		vehicle: unknown
	): Promise<IStaffRow | undefined> => {
		try {
			const response: IStaffRow | undefined = await putRequest(
				AppRoutes.serverVehicleRoutes.createVehicle,
				vehicle
			)
			queryClient.refetchQueries(['vehicles'])
			showSuccess('Vehicle created successfully')
			return response
		} catch (error) {
			showError('Something went wrong creating Vehicle')
			throw new Error((error as Error).message)
		}
	}
	return { createVehicle }
}
