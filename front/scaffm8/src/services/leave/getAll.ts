import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'
import moment from 'moment'

export const useLeaves = () => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchAllLeaves = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverLeavesRoutes.getAllLeaves
			)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const newData = response.data.map((leave: any) => {
				return {
					...leave,
					startDate_date: leave.start_date
						? moment(leave.start_date).toDate()
						: null,
					endDate_date: leave.end_date ? moment(leave.end_date).toDate() : null,
					last_inspection: leave.last_inspection_date
						? moment(leave.last_inspection_date).toDate()
						: null,
				}
			})
			return newData
		} catch (error) {
			showError('Something went wrong getting the Leaves')
			throw new Error('Something went wrong getting the Leaves')
		}
	}

	const { data, isLoading, error } = useQuery(['leaves'], fetchAllLeaves)

	return { data, isLoading, error, enableCreateUpdate }
}
