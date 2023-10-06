import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useJobTask = (job_id?: number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchAllJobs = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverJobsRoutes.getJobTasks,
				job_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Job Task')
			throw new Error('Something went wrong getting Job Task')
		}
	}

	if (!job_id) {
		return {
			data: undefined,
			isLoading: undefined,
			error: undefined,
			enableCreateUpdate,
		}
	}

	const { data, isLoading, error } = useQuery(
		['job_task', job_id],
		fetchAllJobs
	)

	return { data, isLoading, error, enableCreateUpdate }
}
