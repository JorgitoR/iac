import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'

export const useAssetById = (assetId?: string | number) => {
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const fetchAssetById = async () => {
		try {
			if (!assetId) return null
			const response = await getRequest(
				AppRoutes.serverAssetsRoutes.getAsset,
				assetId
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Asset')
			throw new Error('Something went wrong getting Asset')
		}
	}

	const { data, isLoading, error } = useQuery(
		['asset', assetId],
		fetchAssetById
	)

	return { data, isLoading, error }
}
