import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useJobById = (job_id?: number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	if (!job_id) {
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
			enableCreateUpdate,
		}
	}

	const fetchJobById = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverJobsRoutes.getJob,
				job_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Job')
			throw new Error('Something went wrong getting Job')
		}
	}

	const { data, isLoading, error } = useQuery(['job', job_id], fetchJobById)

	return { data, isLoading, error, enableCreateUpdate }
}
