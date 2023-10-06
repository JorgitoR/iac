import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { JobVisitsSchedulerUtils } from 'common/Scheduler'
import { Spinner } from 'common'
import { StyledWrapper } from '../../common/Scheduler/styledComponents'

export function Scheduler() {
	const {
		visitsLoading,
		headerToolbar,
		eventContent,
		eventDrop,
		formatEvents,
	} = JobVisitsSchedulerUtils()

	if (visitsLoading) {
		return <Spinner />
	}
	return (
		<StyledWrapper>
			<FullCalendar
				headerToolbar={{
					...headerToolbar,
					center: 'dayGridMonth',
				}}
				views={{
					Month: {
						type: 'dayGridMonth',
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
				initialView="dayGridMonth"
				height="auto"
				editable
				selectable
				dayMaxEvents
				firstDay={1}
				events={formatEvents()}
				eventDrop={eventDrop}
				schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
			/>
		</StyledWrapper>
	)
}
