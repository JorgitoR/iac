import { XCircleIcon } from '@heroicons/react/24/outline'
import { ConfirmationDialog, Button } from 'common'
import { useUpdateQuoteStatus } from 'services/quotes/updateQuoteStatus'

interface Props {
	quoteId: number
	status: string
}

export const DeclineQuote = ({ quoteId, status }: Props) => {
	const { declineQuote } = useUpdateQuoteStatus()
	return (
		<ConfirmationDialog
			icon="danger"
			title="Decline Quote"
			body="Are you sure you want to decline this quote?"
			triggerButton={
				<button
					type="button"
					id={`${quoteId}`}
					className={
						status !== 'Approved' && status !== 'Declined'
							? 'ml-3 inline-flex items-center text-sm font-medium focus:outline-none hover:text-red-400'
							: 'ml-3 inline-flex items-center text-sm text-gray-200'
					}
					disabled={status === 'Approved' || status === 'Declined'}>
					<XCircleIcon
						className={
							status !== 'Approved' && status !== 'Rejected'
								? '-ml-0.5 mr-2 h-4 w-4 text-red-400'
								: '-ml-0.5 mr-2 h-4 w-4 text-red-100'
						}
						aria-hidden="true"
					/>
					Decline
				</button>
			}
			confirmButton={
				<Button
					size="sm"
					variant="danger"
					onClick={async () => declineQuote(quoteId)}>
					Decline
				</Button>
			}
		/>
	)
}
