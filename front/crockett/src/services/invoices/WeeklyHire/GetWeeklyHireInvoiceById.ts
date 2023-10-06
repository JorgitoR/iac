import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useWeeklyHireInvoiceById = (invoice_id?: number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchWeeklyHireInvoiceById = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverInvoiceRoutes.getWeeklyInvoice,
				invoice_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting Weekly Hire Invoice')
			throw new Error('Something went wrong getting Weekly Hire Invoice')
		}
	}

	const { data, isLoading, error } = useQuery(
		['weeklyHire', invoice_id],
		fetchWeeklyHireInvoiceById
	)

	return { data, isLoading, error, enableCreateUpdate }
}
