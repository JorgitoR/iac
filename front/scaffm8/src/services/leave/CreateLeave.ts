import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import { IStaffRow } from 'models/staff.model'

export const useCreateScaffoldRegister = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createVehicle = async (tag: unknown) => {
		try {
			const response: IStaffRow | undefined = await putRequest(
				AppRoutes.serverScaffoldRegisterRoutes.createScaffoldRegister,
				tag
			)
			queryClient.refetchQueries(['scaffoldRegister'])
			showSuccess('Scaffold Register created successfully')
			return response
		} catch (error) {
			showError('Something went wrong creating Scaffold Register')
			throw new Error((error as Error).message)
		}
	}
	return { createVehicle }
}
