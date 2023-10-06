import { CheckIcon } from '@heroicons/react/24/solid'
import { Button, ConfirmationDialog } from 'common'

export const ApproveTimesheet = () => {
	const handleDelete = async () => {
		null
	}

	return (
		<ConfirmationDialog
			icon="info"
			title={'Approve Timesheet'}
			body="Are you sure you wish to approve this timesheet?"
			triggerButton={
				<Button
					variant="approve"
					size="sm"
					startIcon={
						<CheckIcon
							className="-ml-0.5 mr-2 h-4 w-4 text-white"
							aria-hidden="true"
						/>
					}>
					Approve Timesheets
				</Button>
			}
			confirmButton={
				<Button
					size="sm"
					variant="approve"
					onClick={async () => handleDelete()}>
					Approve
				</Button>
			}
		/>
	)
}
