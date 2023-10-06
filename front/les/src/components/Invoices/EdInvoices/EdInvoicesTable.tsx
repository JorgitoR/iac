import { PencilIcon } from '@heroicons/react/24/solid'
import { Spinner, Table } from 'common'
import { AppRoutes } from 'config'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { InvoiceServices } from 'services'
import { numberFormat } from 'utilities'
import { EdInvoiceCreateForm } from './CreateEdInvoice'

interface WeeklyHireTableProps {
	job_id?: number
}

export const EDInvoicesTable = ({ job_id }: WeeklyHireTableProps) => {
	const location = useLocation()
	const [openCreate, setOpenCreate] = useState(false)
	const { data, isLoading } = InvoiceServices.useEdInvoicesByJobId(job_id)

	if (isLoading) {
		return <Spinner />
	}

	const columns = [
		{ field: 'zone_label', header: 'Zone' },
		{ field: 'type', header: 'Type' },
		{
			field: 'description',
			header: 'Description',
		},
		{
			field: 'erect',
			header: 'Erect Cost',
		},
		{
			field: 'dismantle',
			header: 'Dismantle Cost',
			body: (row: { dismantle: number }) => {
				return numberFormat.format(row.dismantle || 0)
			},
		},
		{
			field: 'total',
			header: 'Total',
			body: (row: { total: number }) => {
				return numberFormat.format(row.total || 0)
			},
		},
		{
			field: 'complete_percent',
			header: '% Complete',
		},
		{
			field: 'PO_Number',
			header: 'PO Number',
		},
		{
			field: 'quote',
			header: 'Quote Number',
		},

		{
			field: 'edit',
			header: 'Edit',
			body: (row: { id: number; status: string }) => {
				if (row.status === 'Pending') {
					return (
						<Link
							to={{
								pathname: AppRoutes.privateRoutes.editInvoice
									.replace(':id', row.id.toString())
									.replace(':invoiceType', 'edInvoice'),
							}}
							state={{ background: location, name: 'editInvoice' }}>
							<PencilIcon className="h-4 w-4 text-gray-500" />
						</Link>
					)
				}
				return <></>
			},
		},
	]

	return (
		<>
			<Table
				columns={columns}
				data={data}
				isLoading={isLoading ?? false}
				title="edInvoices"
				ActionName="Create edInvoice"
				setOpen={setOpenCreate}
				disableButtons
			/>
			<EdInvoiceCreateForm
				formType="create"
				heading="Create edInvoice"
				open={openCreate}
				setOpen={setOpenCreate}
				job_id={job_id}
			/>
		</>
	)
}
