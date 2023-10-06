import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQuery } from '@tanstack/react-query'
import { AppStore } from 'redux/store'
import { Roles } from 'models'

type InvoiceStatus = 'Pending' | 'Approved' | 'Rejected'

export const useInvoices = (invoiceStatus?: InvoiceStatus) => {
	const userState = useSelector((store: AppStore) => store.user)
	const { showError } = useContext(NotificationsContext)
	const { getRequest } = useApi()

	const enableCreateUpdate = userState.userType === Roles.admin

	const fetchAllInvoices = async () => {
		try {
			const response = await getRequest(
				AppRoutes.serverInvoiceRoutes.getAllInvoices
			)

			return response.data
		} catch (error) {
			showError('Something went wrong getting Invoices')
			throw new Error('Something went wrong getting Invoices')
		}
	}

	const returnInvoices = async () => {
		const invoices = await fetchAllInvoices()
		let newInvoices = []
		let i = 0
		for (const invoice of invoices.weeklyHires) {
			newInvoices.push({
				...invoice,
				invoiceType: 'Weekly Hire',
				index: i++,
			})
		}

		for (const invoice of invoices.edinvoices) {
			newInvoices.push({
				...invoice,
				invoiceType: 'edInvoice',
				index: i++,
			})
		}

		if (invoiceStatus) {
			newInvoices = newInvoices.filter(
				(invoice) => invoice.status === invoiceStatus
			)
		}

		newInvoices = newInvoices.sort(sort)

		return newInvoices
	}

	const invoicesKey = invoiceStatus ? `invoices-${invoiceStatus}` : 'invoices'

	const { data, isLoading, error } = useQuery([invoicesKey], returnInvoices)

	return { data, isLoading, error, enableCreateUpdate }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sort = (a: any, b: any) => {
	if (a.job_id < b.job_id) {
		return -1
	} else if (a.job_id > b.job_id) {
		return 1
	} else {
		if (a.invoiceType < b.invoiceType) {
			return -1
		} else if (a.invoiceType > b.invoiceType) {
			return 1
		} else {
			return 0
		}
	}
}
