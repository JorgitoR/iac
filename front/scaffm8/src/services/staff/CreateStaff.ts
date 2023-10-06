import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import { IStaffRow } from 'models/staff.model'

export const useCreateStaff = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createStaff = async (
		staff: IStaffRow
	): Promise<IStaffRow | undefined> => {
		try {
			const response: IStaffRow | undefined = await putRequest(
				AppRoutes.serverStaffRoutes.createStaff,
				staff
			)
			queryClient.refetchQueries(['staff'])
			showSuccess('Staff created successfully')
			return response
		} catch (error) {
			showError((error as Error).message)
			throw new Error((error as Error).message)
		}
	}
	return { createStaff }
}
