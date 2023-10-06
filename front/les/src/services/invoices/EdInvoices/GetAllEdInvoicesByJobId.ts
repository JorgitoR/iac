import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

export const useEdInvoicesByJobId = (job_id?: number) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchEDInvoicesByJobId = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverInvoiceRoutes.getEDInvoicesByJobId,
				job_id
			)
			return response.data
		} catch (error) {
			showError('Something went wrong getting edInvoices')
			throw new Error('Something went wrong getting edInvoices')
		}
	}

	const { data, isLoading, error } = useQuery(
		['ed_invoices', job_id],
		fetchEDInvoicesByJobId
	)

	return { data, isLoading, error, enableCreateUpdate }
}
