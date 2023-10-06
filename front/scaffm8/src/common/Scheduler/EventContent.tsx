import { AppRoutes } from 'config'
import { Container, TaskContainer } from './styledComponents'
import { Link, Location } from 'react-router-dom'

interface EventProps {
	type: string
	job_id: number
	teamLeader: string
	site: string
}

interface IProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	event: any
	location: Location
}

const EventView = ({ event, location }: IProps) => {
	const color = {
		Install: '#10B981',
		Dismantle: '#0078d4',
		Adjustment: '#EF4444',
		Remedial: '#fbb724',
	}
	const eventProp: EventProps = event.extendedProps
	const { publicId: visitId } = event._def
	const styles = () => ({
		color: 'white',
		backgroundColor: color[eventProp.type as keyof typeof color] || '#10B981',
	})

	return (
		<Link
			to={{
				pathname: AppRoutes.privateRoutes.visitsEdit.replace(
					':id',
					visitId.toString()
				),
			}}
			state={{ background: location, name: 'editVisit' }}>
			<Container
				padding="0.5px"
				fontSize="0.8rem"
				color={styles().color}
				backgroundColor={styles().backgroundColor}>
				<TaskContainer>
					<b>Job #:</b> {eventProp.job_id} - {eventProp.site}
				</TaskContainer>
				<TaskContainer>
					<b>Team Leader:</b> {eventProp.teamLeader}
				</TaskContainer>
			</Container>
		</Link>
	)
}

export default EventView
