import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateNotes = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest, getRequest } = useApi()
	const queryClient = useQueryClient()

	const CreateNotes = async (appFile: unknown) => {
		try {
			const response = await putRequest(
				AppRoutes.serverNotesAndFilesRoutes.createNotesAndFiles,
				appFile
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
	return { CreateNotes }
}
