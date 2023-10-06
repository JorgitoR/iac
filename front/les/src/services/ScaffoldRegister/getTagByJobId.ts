import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'
import moment from 'moment'

export const useGetTagByJobId = (id?: string | number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchTagsByJobId = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverScaffoldRegisterRoutes.getAllScaffoldRegisterByJobId,
				id
			)

			const newData = response.data.map(
				(tag: { last_inspection: string; inspection_date: string }) => {
					return {
						...tag,
						last_inspection_date: tag.last_inspection
							? moment(tag.last_inspection).toDate()
							: null,
						inspection_date: tag.inspection_date
							? moment(tag.inspection_date).toDate()
							: null,
					}
				}
			)

			return newData
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

	const { data, isLoading, error } = useQuery(
		['tag', id || ''],
		fetchTagsByJobId
	)

	return { data, isLoading, error, enableCreateUpdate }
}
