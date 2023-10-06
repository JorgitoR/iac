import { CheckIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Input, TextArea, Button, ConfirmationDialog } from 'common'
import { AppStore } from 'redux/store'
import { useSelector } from 'react-redux'
import { useUpdateQuoteStatus } from 'services/quotes/updateQuoteStatus'
interface Props {
	quoteId: number
	status: string
}

export const ApproveQuote = ({ quoteId, status }: Props) => {
	const { approveQuote: approveQuoteFn } = useUpdateQuoteStatus()
	const userState = useSelector((store: AppStore) => store.user)
	const [isLoading, setIsLoading] = useState(false)
	const [state, setState] = useState({
		approvedBy: userState.name,
		description: '',
	})

	const handleInputChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { id, value } = event.target

		setState({
			...state,
			[id]: value,
		})
	}

	return (
		<ConfirmationDialog
			icon="info"
			title="Approve Quote"
			body=" Are you sure you want to approve this quote? This action will create a job with a list of tasks."
			triggerButton={
				<button
					type="button"
					id={`${quoteId}`}
					className={
						status !== 'Approved' && status !== 'Declined'
							? 'ml-3 inline-flex items-center text-sm font-medium focus:outline-none hover:text-green-400'
							: 'ml-3 inline-flex items-center text-sm text-gray-200'
					}
					disabled={status === 'Approved' || status === 'Declined'}>
					<CheckIcon
						className={
							status !== 'Approved' && status !== 'Rejected'
								? '-ml-0.5 mr-2 h-4 w-4 text-green-400'
								: '-ml-0.5 mr-2 h-4 w-4 text-green-100'
						}
						aria-hidden="true"
					/>
					Approve
				</button>
			}
			confirmButton={
				<Button
					isLoading={isLoading}
					size="sm"
					variant="approve"
					onClick={async () => {
						setIsLoading(true)
						approveQuoteFn(quoteId, state.approvedBy, state.description)
						setIsLoading(false)
					}}>
					Approve
				</Button>
			}>
			<div className="flex">
				<div className="w-1/2">
					<Input
						placeholder="Approved By"
						title="Approved By"
						id="approvedBy"
						type="text"
						value={state.approvedBy}
						handleChange={handleInputChange}
						handleBlur={() => null}
					/>
				</div>
			</div>
			<TextArea
				title="Confirmation Text"
				id="description"
				type="text"
				rows={10}
				value={state.description}
				handleChange={handleInputChange}
			/>
		</ConfirmationDialog>
	)
}
