import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import { IStaffRow } from 'models/staff.model'

export const useUpdateStaff = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateStaff = async (
		staff: IStaffRow,
		id: string | number
	): Promise<IStaffRow | undefined> => {
		try {
			const response: IStaffRow | undefined = await postRequest(
				AppRoutes.serverStaffRoutes.updateStaff,
				staff,
				id
			)
			showSuccess('Staff updated successfully')
			queryClient.refetchQueries(['staff'])
			return response
		} catch (error) {
			showError('Something went wrong updating staff')
			throw new Error('Something went wrong updating staff')
		}
	}
	return { updateStaff }
}
