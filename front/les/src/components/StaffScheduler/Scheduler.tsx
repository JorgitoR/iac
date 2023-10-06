import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { StyledWrapper } from '../../common/Scheduler/styledComponents'
import { JobVisitsSchedulerUtils } from 'common/Scheduler'
import { Spinner } from 'common'
interface IFormatResource {
	id: string
	title: string
}

export function Scheduler() {
	const {
		visitsData,
		visitsLoading,
		headerToolbar,
		eventContent,
		eventDrop,
		formatEvents,
	} = JobVisitsSchedulerUtils()
	const formatResources = () => {
		if (visitsData) {
			const staffCrewLeaders: IFormatResource[] = []
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			visitsData.map((visit: any) => {
				if (visit?.teamLeaderData?.type === 'Crew Leader') {
					staffCrewLeaders.push({
						id: visit?.teamLeaderData?.id,
						title: visit?.teamLeaderData?.staff_name,
					})
				}
			})
			return staffCrewLeaders
		}
		return []
	}

	if (visitsLoading) {
		return <Spinner />
	}

	return (
		<StyledWrapper>
			<FullCalendar
				resourceAreaHeaderContent="Staff"
				resourceAreaWidth="8%"
				filterResourcesWithEvents
				headerToolbar={{
					...headerToolbar,
					center: 'Day,Week,Month',
				}}
				slotMinWidth={100}
				views={{
					Day: {
						type: 'resourceTimelineDay',
						slotDuration: { days: 1 },
						slotLabelFormat: [
							{ weekday: 'long' }, // lower level of text
						],
						eventContent,
					},
					Week: {
						type: 'resourceTimelineWeek',
						slotLabelInterval: { days: 1 },
						weekends: true,
						slotLabelFormat: [
							{ weekday: 'short' }, // lower level of text
						],
						eventContent,
					},
					Month: {
						type: 'resourceTimelineMonth',
						slotLabelInterval: { days: 1 },
						weekends: true,
						eventContent,
					},
				}}
				eventContent={eventContent}
				plugins={[
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin,
					resourceTimelinePlugin,
				]}
				initialView="resourceTimelineMonth"
				height="auto"
				editable
				selectable
				dayMaxEvents
				firstDay={1}
				resources={formatResources()}
				events={formatEvents()}
				eventDrop={eventDrop}
				schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
			/>
		</StyledWrapper>
	)
}
