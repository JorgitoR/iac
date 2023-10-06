import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateAssets = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()
	const queryClient = useQueryClient()

	const updateAsset = async (asset_id: number, asset: unknown) => {
		try {
			const response = await postRequest(
				AppRoutes.serverAssetsRoutes.updateAsset,
				asset,
				asset_id
			)
			queryClient.refetchQueries(['assets'])
			queryClient.refetchQueries(['assets', asset_id])
			showSuccess('Asset updated successfully')
			return response
		} catch (error) {
			showError('Something went wrong updating Asset')
			throw new Error((error as Error).message)
		}
	}
	return { updateAsset }
}
