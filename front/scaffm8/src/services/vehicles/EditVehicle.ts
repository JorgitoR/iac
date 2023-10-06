import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import { IStaffRow } from 'models/staff.model'

export const useEditVehicle = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateVehicle = async (
		vehicle_id: string | number,
		vehicle: unknown
	) => {
		try {
			const response: IStaffRow | undefined = await postRequest(
				AppRoutes.serverVehicleRoutes.updateVehicle,
				vehicle,
				vehicle_id
			)
			queryClient.refetchQueries(['vehicles'])
			queryClient.refetchQueries(['vehicle', vehicle_id])
			showSuccess('Vehicle updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating vehicle')
			throw new Error((error as Error).message)
		}
	}
	return { updateVehicle }
}
