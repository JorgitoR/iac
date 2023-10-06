import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'
import { IStaffRow } from 'models/staff.model'

export const useStaff = () => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchAllStaff = async (): Promise<IStaffRow[] | undefined> => {
		try {
			const response = await getRequest(AppRoutes.serverStaffRoutes.getAllStaff)

			return response.data as IStaffRow[]
		} catch (error) {
			showError('Something went wrong getting staff')
			throw new Error('Something went wrong getting staff')
		}
	}

	const { data, isLoading, error } = useQuery(['staff'], fetchAllStaff)

	return { data, isLoading, error, enableCreateUpdate }
}
