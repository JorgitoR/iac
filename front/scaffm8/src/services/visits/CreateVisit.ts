import { useContext } from 'react'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { useQueryClient } from '@tanstack/react-query'
import { IStaffRow } from 'models/staff.model'
import moment from 'moment'

export const useCreateVisit = () => {
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()
	const queryClient = useQueryClient()

	const createVisit = async (visit: unknown) => {
		try {
			const response: IStaffRow | undefined = await putRequest(
				AppRoutes.serverVisitRoutes.createVisit,
				visit
			)
			queryClient.refetchQueries(['visits'])
			showSuccess('Visits created successfully')
			return response
		} catch (error) {
			showError('Something went wrong creating Visits')
			throw new Error((error as Error).message)
		}
	}

	const enumerateDaysBetweenDates = (startDate: string, endDate: string) => {
		const end = moment(endDate, 'DD/MM/YYYY')
		const start = moment(startDate, 'DD/MM/YYYY')
		const result = [moment({ ...start })]

		if (end.diff(start, 'days') >= 0) {
			while (end.date() !== start.date()) {
				start.add(1, 'day')
				result.push(moment({ ...start }))
			}
		}

		return result.map((x) => x.format('DD/MM/YYYY'))
	}

	return { createVisit, enumerateDaysBetweenDates }
}
