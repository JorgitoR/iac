import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateNotes = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest, getRequest } = useApi()
	const queryClient = useQueryClient()

	const UpdateNotes = async (note: unknown, id: number | string) => {
		try {
			const response = await postRequest(
				AppRoutes.serverNotesAndFilesRoutes.updateNotesAndFiles,
				note,
				id
			)
			await getRequest(AppRoutes.serverNotesAndFilesRoutes.getAllNotesAndFiles)
			queryClient.refetchQueries(['notes'])
			showSuccess('Notes created successfully')
			return response
		} catch (error) {
			showError('Something went wrong creating Notes File')
			throw new Error((error as Error).message)
		}
	}
	return { UpdateNotes }
}
