import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { IStaffRow } from 'models/staff.model'
import { AppStore } from 'redux/store'
import { useSelector } from 'react-redux'
import { Roles } from 'models'

export const useStaffById = (staff_id?: string | number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchStaffByStaff = async (): Promise<IStaffRow | undefined> => {
		try {
			const response = await getRequest(
				AppRoutes.serverStaffRoutes.getStaff,
				staff_id
			)
			return response.data as IStaffRow
		} catch (error) {
			showError('Something went wrong getting staff')
			throw new Error('Something went wrong getting staff')
		}
	}

	if (!staff_id)
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
			enableCreateUpdate,
		}

	const { data, isLoading, error } = useQuery(
		['staff', staff_id],
		fetchStaffByStaff
	)

	return { data, isLoading, error, enableCreateUpdate }
}
