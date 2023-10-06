import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useLeaveById = (id?: string | number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchLeaveById = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverLeavesRoutes.getLeave,
				id
			)

			return response.data
		} catch (error) {
			showError('Something went wrong getting the leave')
			throw new Error('Something went wrong getting the leave')
		}
	}

	if (!id) {
		return {
			data: undefined,
			isLoading: false,
			error: undefined,
			enableCreateUpdate,
		}
	}

	const { data, isLoading, error } = useQuery(
		['leave', id || ''],
		fetchLeaveById
	)

	return { data, isLoading, error, enableCreateUpdate }
}
