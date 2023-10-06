import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useCreateAssets = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createAsset = async (asset: unknown) => {
		try {
			const response = await putRequest(
				AppRoutes.serverAssetsRoutes.createAsset,
				asset
			)
			queryClient.refetchQueries(['assets'])
			showSuccess('Asset created successfully')
			return response
		} catch (error) {
			showError('Something went wrong creating Asset')
			throw new Error((error as Error).message)
		}
	}
	return { createAsset }
}
