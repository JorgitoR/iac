import { TrashIcon } from '@heroicons/react/24/solid'
import { Button, ConfirmationDialog } from 'common'
import { InvoiceServices } from 'services'

interface DeleteInvoiceProps {
	invoice: {
		id: string
		invoiceType: string
	}
}

export const DeleteInvoice = ({ invoice }: DeleteInvoiceProps) => {
	const { deleteEdInvoice } = InvoiceServices.useDeleteEDInvoice()
	const { deleteWeeklyHireInvoice } =
		InvoiceServices.useDeleteWeeklyHireInvoice()

	const handleDelete = async () => {
		if (invoice.invoiceType === 'Weekly Hire') {
			await deleteWeeklyHireInvoice(invoice.id)
		} else {
			await deleteEdInvoice(invoice.id)
		}
	}

	return (
		<ConfirmationDialog
			icon="danger"
			title={`Delete ${invoice.invoiceType}`}
			body=" Are you sure you want to delete this item? This action is unrecoverable!"
			triggerButton={
				<button type="button">
					<TrashIcon className="h-4 w-4 text-gray-500" />
				</button>
			}
			confirmButton={
				<Button size="sm" variant="danger" onClick={async () => handleDelete()}>
					Delete
				</Button>
			}
		/>
	)
}
