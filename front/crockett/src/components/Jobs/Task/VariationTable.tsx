import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, ConfirmationDialog, Spinner, Table } from 'common'
import { AppRoutes } from 'config'
import { Link, useLocation } from 'react-router-dom'
import { JobsServices } from 'services'
import { VariationTaskForm } from './VariationForm'
import { useState } from 'react'
interface JobTaskTableProps {
	job_id?: number
	client_id: number
}

export const JobVariationsTableTable = ({
	job_id,
	client_id,
}: JobTaskTableProps) => {
	const location = useLocation()
	const [openCreateVariation, setOpenCreateVariation] = useState(false)
	const { data, isLoading, enableCreateUpdate } =
		JobsServices.useJobTask(job_id)
	const { deleteTask } = JobsServices.useDeleteJobTask()

	if (isLoading) {
		return <Spinner />
	}

	const columns = [
		{ field: 'zone', header: 'Zone' },
		{ field: 'zone_label', header: 'Zone Label' },
		{ field: 'type', header: 'Type' },
		{ field: 'description', header: 'Description' },
		{ field: 'total_hours', header: 'Total Hours' },
		{ field: 'percentage_complete', header: '% Completed' },
		{
			field: 'quote_num',
			header: 'Variation Quote #',
		},
		{ field: 'created_by', header: 'Created By' },
		{ field: 'PO_Number', header: 'PO Number' },
		{ field: 'Requester', header: 'Requester' },
		{
			field: 'quote_id',
			header: 'Quote',
			body: (row: { quote_id: number }) => {
				if (row.quote_id === null) {
					return <></>
				}
				return (
					<Link
						to={AppRoutes.privateRoutes.QuotesDetail.replace(
							':id',
							row.quote_id.toString()
						)}>
						Link
					</Link>
				)
			},
		},
		{
			field: 'edit',
			header: 'edit',
			body: (row: { id: number }) =>
				enableCreateUpdate ? (
					<Link
						to={{
							pathname: AppRoutes.privateRoutes.tasksEdit.replace(
								':id',
								row.id.toString()
							),
						}}
						state={{ background: location, name: 'editTask' }}>
						<PencilIcon className="h-4 w-4 text-gray-500" />
					</Link>
				) : (
					<></>
				),
		},
		{
			field: 'delete',
			header: 'delete',
			body: (row: { id: number }) => (
				<ConfirmationDialog
					icon="danger"
					title="Delete Task"
					body="Are you sure you want to delete this task? This action is unrecoverable!"
					triggerButton={
						<button type="button">
							<TrashIcon className="h-4 w-4 text-gray-500" />
						</button>
					}
					confirmButton={
						<Button
							size="sm"
							variant="danger"
							onClick={async () => deleteTask(row.id)}>
							Delete
						</Button>
					}
				/>
			),
		},
	]

	return (
		<>
			<Table
				title="Variations Task"
				isLoading={isLoading ?? false}
				columns={columns}
				data={data.filter(
					(task: { task_type: string }) => task.task_type === 'Variation'
				)}
				ActionName="Create Variation Task"
				setOpen={setOpenCreateVariation}
				disableButtons
			/>
			<VariationTaskForm
				job_id={job_id}
				client_id={client_id}
				formType="create"
				heading="Create Variation Task"
				open={openCreateVariation}
				setOpen={setOpenCreateVariation}
			/>
		</>
	)
}
