import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useNoteById = (note_id?: string | number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchNoteById = async () => {
		try {
			if (!note_id) return null
			const response = await getRequest(
				AppRoutes.serverNotesAndFilesRoutes.getNotesAndFiles,
				note_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Note')
			throw new Error('Something went wrong getting Note')
		}
	}

	const { data, isLoading, error } = useQuery(['note', note_id], fetchNoteById)

	return { data, isLoading, error }
}
