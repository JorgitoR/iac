import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InvoicesComponents } from 'components'

export const InvoicesEdit = () => {
	const [openInvoicesForm, setOpenInvoicesForm] = useState(true)
	const navigate = useNavigate()

	const { id, invoiceType } = useParams()

	useEffect(() => {
		if (!openInvoicesForm) {
			navigate(-1)
		}
	}, [openInvoicesForm])

	if (invoiceType === 'weeklyHire') {
		return (
			<InvoicesComponents.WeeklyHireInvoiceEditForm
				formType="update"
				heading="Edit Weekly Hire Invoice"
				open={openInvoicesForm}
				setOpen={setOpenInvoicesForm}
				invoice_id={Number(id)}
			/>
		)
	}

	if (invoiceType === 'edInvoice') {
		return (
			<InvoicesComponents.EdInvoiceEditForm
				formType="update"
				heading="Edit edInvoice"
				open={openInvoicesForm}
				setOpen={setOpenInvoicesForm}
				invoice_id={Number(id)}
			/>
		)
	}
	return <></>
}
