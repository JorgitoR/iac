import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useNotesStaff = (id: number | string) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAllNotes = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverNotesAndFilesRoutes.getAllNotesAndFilesByStaffId,
				id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting the Notes')
			throw new Error('Something went wrong getting the Notes')
		}
	}

	const { data, isLoading, error } = useQuery(['notes'], fetchAllNotes)

	return { data, isLoading, error }
}
