import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, ConfirmationDialog, Spinner, Table, Badge } from 'common'
import { AppRoutes } from 'config'
import { Link, useLocation } from 'react-router-dom'
import { JobsServices, VisitServices } from 'services'

interface VisitsTableProps {
	job_id?: number
}

export const WeeklyHireTable = ({ job_id }: VisitsTableProps) => {
	const location = useLocation()
	const { data, isLoading } = VisitServices.useVisitsByJobId(job_id)

	if (isLoading) {
		return <Spinner />
	}

	const columns = [
		{ field: 'date', header: 'Date' },
		{ field: 'teamLeaderData.staff_name', header: 'Team Leader' },
		{ field: 'type', header: 'Type' },
		{
			field: 'status',
			header: 'Status',
			body: (row: { status: string }) => {
				return <Badge text={row.status} type={row.status} />
			},
		},
		{
			field: 'edit',
			header: 'edit',
			body: (row: { id: number }) => (
				<Link
					to={{
						pathname: AppRoutes.privateRoutes.visitsEdit.replace(
							':id',
							row.id.toString()
						),
					}}
					state={{ background: location, name: 'editTask' }}>
					<PencilIcon className="h-4 w-4 text-gray-500" />
				</Link>
			),
		},
	]

	return (
		<>
			<Table
				columns={columns}
				data={data}
				isLoading={isLoading ?? false}
				title="Visits"
			/>
		</>
	)
}
