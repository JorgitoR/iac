import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateScaffoldRegister = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateScaffoldRegister = async (tag_id: number, tag: unknown) => {
		try {
			const response = await postRequest(
				AppRoutes.serverScaffoldRegisterRoutes.updateScaffoldRegister,
				tag,
				tag_id
			)
			queryClient.refetchQueries(['scaffoldRegister'])
			queryClient.refetchQueries(['tag', tag_id])
			showSuccess('Scaffold Register updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating The Scaffold Register')
			throw new Error((error as Error).message)
		}
	}
	return { updateScaffoldRegister }
}
