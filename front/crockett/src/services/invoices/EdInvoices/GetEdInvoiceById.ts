import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useEdInvoiceById = (invoice_id?: number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchEDInvoiceById = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverInvoiceRoutes.getEdinvoice,
				invoice_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting edInvoice')
			throw new Error('Something went wrong getting edInvoice')
		}
	}

	const { data, isLoading, error } = useQuery(
		['edinvoice', invoice_id],
		fetchEDInvoiceById
	)

	return { data, isLoading, error, enableCreateUpdate }
}
