import { PencilIcon } from '@heroicons/react/24/solid'
import { Spinner, Table, Badge } from 'common'
import { VisitForm } from 'components/Visits'
import { AppRoutes } from 'config'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { VisitServices } from 'services'

interface VisitsTableProps {
	job_id?: number
}

export const VisitsTable = ({ job_id }: VisitsTableProps) => {
	const location = useLocation()
	const { data, isLoading } = VisitServices.useVisitsByJobId(job_id)
	const [showVisitForm, setShowVisitForm] = useState(false)

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
				ActionName="Create Visit"
				setOpen={setShowVisitForm}
				disableButtons
			/>
			<VisitForm
				heading="Create Visit"
				formType="create"
				open={showVisitForm}
				setOpen={setShowVisitForm}
				job_id={job_id}
			/>
		</>
	)
}
