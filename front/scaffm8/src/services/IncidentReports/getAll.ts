import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useIncendentReports = () => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchAllLeaves = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverIncidentReportsRoutes.getAllIncidentReports
			)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const newData = response.data.map((incident: any) => {
				return {
					...incident,
				}
			})
			return newData
		} catch (error) {
			showError('Something went wrong getting the Incident')
			throw new Error('Something went wrong getting the Incident')
		}
	}

	const { data, isLoading, error } = useQuery(['leaves'], fetchAllLeaves)

	return { data, isLoading, error, enableCreateUpdate }
}
