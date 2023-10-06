import { CheckIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Input, TextArea, Button, ConfirmationDialog } from 'common'
import { QuoteData } from 'models'
import { useUploadQuote } from 'services/quotes/UploadQuote'
import { useSendQuote } from 'services/quotes/sendQuote'
interface Props {
	quoteId: number
	emailStatus: string
	quote: QuoteData
}

export const EmailStatus = ({ quoteId, emailStatus, quote }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const { uploadQuote } = useUploadQuote()
	const { sendEmail, markAsPending } = useSendQuote()

	const clientContact = quote.client_contact ? quote.contactData.name : ''

	const [state, setState] = useState({
		subject: `Quote ${quote.quote_num}`,
		body: `Hi ${clientContact}


Thank you for the opportunity to be involved with this project. Please see our quote attached, which is based on the information provided to us and/or a site visit.


Client Name: ${quote.clientData.client_name}
Job Reference: ${quote.street}
Quote/Job #: ${quote.quote_num}
Attention of: ${clientContact}


To accept our quote, please either reply to this email with your preferred start date and purchase order number (if applicable); OR use this link to review and accept our quote.


If you have any questions or would like to discuss further, please don't hesitate to get in touch.


We look forward to working with you on this project.
Thanks again,

`,
	})

	const newStatus = emailStatus === 'Ready to Send' ? 'Sent' : 'Ready to Send'

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
			isDone={isLoading}
			icon="info"
			title="Send Quote"
			body={`Are you sure you want to mark this quote as ${newStatus} ? ${
				newStatus === 'Sent'
					? 'This action will send a quote to the client contact.'
					: ''
			}`}
			triggerButton={
				<button
					type="button"
					disabled={quote.status === 'Approved' || quote.status === 'Declined'}
					id={`${quoteId}`}
					className="ml-3 inline-flex items-center text-sm font-medium focus:outline-none hover:text-green-400">
					{emailStatus === 'Ready to Send' && (
						<CheckIcon
							className="-ml-0.5 mr-2 h-4 w-4 text-green-400"
							aria-hidden="true"
						/>
					)}
					{emailStatus === 'Sent' && (
						<XCircleIcon
							className={
								quote.status !== 'Approved' && quote.status !== 'Rejected'
									? '-ml-0.5 mr-2 h-4 w-4 text-red-400'
									: '-ml-0.5 mr-2 h-4 w-4 text-red-100'
							}
							aria-hidden="true"
						/>
					)}
					<p
						className={
							quote.status !== 'Approved' && quote.status !== 'Rejected'
								? 'text-gray-600'
								: 'text-gray-300'
						}>
						{emailStatus}
					</p>
				</button>
			}
			confirmButton={
				<Button
					isLoading={isLoading}
					variant="approve"
					size="sm"
					onClick={async () => {
						setIsLoading(true)
						if (!state.body || !state.subject) {
							return
						}

						if (newStatus === 'Sent') {
							const urlQuote = await uploadQuote(quoteId)

							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							let htmlText = ''
							const messageTextArray = state.body.split('\n')

							messageTextArray.forEach((line) => {
								htmlText += `<p>${line}</p>`
							})

							htmlText += `<p><a href="${urlQuote}">Click here to view quote</a></p>`

							const emailData = {
								subject: state.subject,
								email: quote.contactData.email,
								body: htmlText,
								quoteId: quoteId,
							}

							await sendEmail(emailData)
						} else {
							await markAsPending(quoteId)
						}
						setIsLoading(false)
					}}>
					Mark as {newStatus}
				</Button>
			}>
			<>
				{newStatus === 'Sent' && (
					<>
						<div className="flex">
							<div className="w-1/2">
								<Input
									title="Subject"
									id="subject"
									type="text"
									value={state.subject}
									handleChange={handleInputChange}
									error={!state.subject ? 'Subject Is Requied' : ''}
									placeholder={''}
									handleBlur={() => null}
								/>
							</div>
						</div>
						<TextArea
							title="Body Text"
							id="body"
							type="text"
							value={state.body}
							handleChange={handleInputChange}
							rows={10}
							error={!state.body ? 'Body Is Requied' : ''}
						/>
					</>
				)}
			</>
		</ConfirmationDialog>
	)
}
