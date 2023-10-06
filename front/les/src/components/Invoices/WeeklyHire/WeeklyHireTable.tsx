import { PencilIcon } from '@heroicons/react/24/solid'
import { Spinner, Table } from 'common'
import { AppRoutes } from 'config'
import { Link, useLocation } from 'react-router-dom'
import { InvoiceServices } from 'services'
import { numberFormat } from 'utilities'

interface WeeklyHireTableProps {
	job_id?: number
}

export const WeeklyHireTable = ({ job_id }: WeeklyHireTableProps) => {
	const location = useLocation()
	const { data, isLoading } =
		InvoiceServices.useWeekylHireInvoicesByJobId(job_id)

	if (isLoading) {
		return <Spinner />
	}

	console.log(data)
	console.log('.......')

	const columns = [
		{ field: 'zone_label', header: 'Zone' },
		{ field: 'type', header: 'Type' },
		{
			field: 'description',
			header: 'Description',
		},
		{
			field: 'on_hire',
			header: 'On Hire',
		},
		{
			field: 'erect_percent',
			header: '% Erect',
		},
		{
			field: 'date_on_hire',
			header: 'Date On Hire',
		},
		{
			field: 'completed_date',
			header: 'Completed Date',
		},
		{
			field: 'days_on_hire',
			header: 'Days on Hire',
		},
		{
			field: 'weekly_hire_rate',
			header: 'Weekly Hire Rate',
			body: (row: { weekly_hire_rate: number }) => {
				return numberFormat.format(row.weekly_hire_rate || 0)
			},
		},
		{
			field: 'handover_url',
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
		{
			field: 'edit',
			header: 'edit',
			body: (row: { id: number; status: string }) => {
				if (row.status === 'Pending') {
					return (
						<Link
							to={{
								pathname: AppRoutes.privateRoutes.editInvoice
									.replace(':id', row.id.toString())
									.replace(':invoiceType', 'weeklyHire'),
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
				title="Weekly Hire Invoices"
				disableButtons
			/>
		</>
	)
}
