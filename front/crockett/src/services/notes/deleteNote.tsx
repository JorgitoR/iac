import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useDeleteNote = () => {
	const { showError, showSuccess } = useContext(NotificationsContext)
	const { deleteRequest } = useApi()
	const queryClient = useQueryClient()

	const deleteNote = async (note_id: number) => {
		try {
			const response = await deleteRequest(
				AppRoutes.serverNotesAndFilesRoutes.updateNotesAndFiles,
				note_id
			)
			showSuccess('Note removed successfully')
			queryClient.refetchQueries(['notes'])
			return response.data
		} catch (error) {
			showError('Something went wrong when removing the note')
			throw new Error('Something went wrong when removing the note')
		}
	}

	return { deleteNote }
}
