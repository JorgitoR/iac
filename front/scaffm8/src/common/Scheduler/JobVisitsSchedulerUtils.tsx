import { VisitServices } from 'services'
import EventView from './EventContent'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

export function JobVisitsSchedulerUtils() {
	const location = useLocation()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const eventContent = (view: any) => (
		<EventView event={view.event} location={location} />
	)
	const { data: visitsData, isLoading: visitsLoading } =
		VisitServices.useVisits()
	const { updateVisit } = VisitServices.useUpdateVisit()
	const headerToolbar = {
		left: 'title',
		right: 'prev,today,next',
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const eventDrop = async ({ event }: any) => {
		const visitId = Number(event?.id)
		const newDate = moment(event?.start).format('DD/MM/YYYY')
		if (visitId && newDate) {
			const payload = {
				date: newDate,
			}
			await updateVisit(visitId, payload)
		}
	}

	const formatEvents = () => {
		if (!visitsLoading && visitsData) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return visitsData.map((visit: any) => ({
				id: visit.id,
				resourceId: visit.teamLeaderData?.id,
				job_id: visit?.jobData?.job_num,
				title: visit.visit_status,
				teamLeader: visit.teamLeaderData?.staff_name || '',
				type: visit?.type,
				site: visit.jobData?.site,
				start: moment(visit?.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			}))
		}
		return []
	}

	return {
		formatEvents,
		visitsData,
		visitsLoading,
		headerToolbar,
		eventDrop,
		eventContent,
	}
}
