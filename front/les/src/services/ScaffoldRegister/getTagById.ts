import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useGetTagById = (id?: string | number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchTagsById = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverScaffoldRegisterRoutes.getScaffoldRegister,
				id
			)

			return response.data
		} catch (error) {
			showError('Something went wrong getting the scaffold register')
			throw new Error('Something went wrong getting the scaffold register')
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

	const { data, isLoading, error } = useQuery(['tag', id || ''], fetchTagsById)

	return { data, isLoading, error, enableCreateUpdate }
}
