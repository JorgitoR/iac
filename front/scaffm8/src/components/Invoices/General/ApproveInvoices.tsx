import { useState } from 'react'
import moment from 'moment'
import { DateSelect, Button, ConfirmationDialog } from 'common'
import { InvoiceServices } from 'services'

interface IProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	invoicesSelected: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setInvoicesSelected: any
	endOfMonth?: boolean
}

export const ApproveInvoices = ({
	invoicesSelected,
	setInvoicesSelected,
	endOfMonth,
}: IProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [completed, setCompleted] = useState(false)
	const [date, setDate] = useState(moment().format('DD/MM/YYYY'))

	const { approveInvoices } = InvoiceServices.useApproveInvoices()

	const approveInvoicesHandler = async () => {
		if (invoicesSelected) {
			setIsLoading(true)
			const invoices = invoicesSelected.map(
				(invoice: { id: number; invoiceType: string }) => {
					return {
						id: invoice.id,
						invoiceType: invoice.invoiceType,
					}
				}
			)

			await approveInvoices(invoices, date, endOfMonth)

			setInvoicesSelected(null)
			setIsLoading(false)
			setCompleted(true)
		}
	}

	return (
		<ConfirmationDialog
			isDone={completed}
			icon="info"
			title="Approve Invoices"
			body=" This action will approve the invoices selected. Select a Date for the process"
			triggerButton={
				<Button
					size="sm"
					variant="primary"
					onClick={() => {
						null
					}}>
					{endOfMonth ? 'End of Month' : 'Approve Invoices'}
				</Button>
			}
			confirmButton={
				<Button
					size="sm"
					isLoading={isLoading}
					variant="approve"
					onClick={async () => {
						setIsLoading(true)
						await approveInvoicesHandler()
						setIsLoading(false)
						setCompleted(true)
					}}>
					Approve Invoices
				</Button>
			}>
			<div className="flex">
				<DateSelect
					title="Approve Invoices"
					id="date"
					value={date}
					onChange={(e, val) => {
						setDate(val)
					}}
				/>

				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</ConfirmationDialog>
	)
}
