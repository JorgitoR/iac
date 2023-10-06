import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, ConfirmationDialog, Spinner, Table } from 'common'
import { AppRoutes } from 'config'
import { Link, useLocation } from 'react-router-dom'
import { JobsServices } from 'services'
interface JobTaskTableProps {
	job_id?: number
}

export const JobTaskTable = ({ job_id }: JobTaskTableProps) => {
	const location = useLocation()
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
		{ field: 'percentage_erect', header: '% Erect' },
		{ field: 'percentage_dismantle', header: '% Dismantle' },
		{ field: 'percentage_complete', header: '% Completed' },
		{
			field: 'handover_certificate',
			header: 'Handover Certificate',
			body: (row: { handover_url: string }) => {
				if (row.handover_url) {
					return (
						<a href={row.handover_url} target="_blank" rel="noreferrer">
							Link
						</a>
					)
				}
				return <></>
			},
		},
		{ field: 'complete', header: 'completed' },
		{
			field: 'quote_id',
			header: 'Quote',
			body: (row: { quote_id: number }) => (
				<Link
					to={AppRoutes.privateRoutes.QuotesEdit.replace(
						':id',
						row.quote_id?.toString()
					)}>
					{row.quote_id}
				</Link>
			),
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
			body: (row: { id: number }) =>
				enableCreateUpdate ? (
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
				) : (
					<></>
				),
		},
	]

	return (
		<>
			<Table
				columns={columns}
				data={data.filter(
					(task: { task_type: string }) => task.task_type === 'Task'
				)}
				isLoading={isLoading ?? false}
				title="Job Task"
				disableButtons
			/>
		</>
	)
}
