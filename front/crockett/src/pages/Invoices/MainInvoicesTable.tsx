import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { ApproveInvoices, DeleteInvoice } from 'components/Invoices'
import { InvoiceServices, DataTableServices } from 'services'
import { Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { numberFormat } from 'utilities'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { AppRoutes } from 'config'

export const MainInvoicesTable = () => {
	const location = useLocation()
	const { data, isLoading, enableCreateUpdate } =
		InvoiceServices.useInvoices('Pending')
	const [invoicesSelected, setInvoicesSelected] = useState(null)

	const {
		clearFilter,
		filters,
		globalFilterValue,
		setFilters,
		setGlobalFilterValue,
		globalFilterFields,
		dataTableReference,
	} = DataTableServices.useFiltersDataTable({
		initialFilters: [
			{
				filterName: 'invoiceType',
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterInitialValue: '',
				filterOptions: [],
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
			},
		],
		aditionalGlobalFilterFields: [],
	})

	const header = DataTableHeader({
		clearFilter,
		globalFilterValue,
		filters,
		setFilters,
		setGlobalFilterValue,
		dataTableReference,
	})

	return (
		<div className="card">
			<PageHeading title="Invoices" />
			<div className="px-8 flex justify-start space-x-4">
				<ApproveInvoices
					invoicesSelected={invoicesSelected}
					setInvoicesSelected={setInvoicesSelected}
				/>
				<ApproveInvoices
					invoicesSelected={invoicesSelected}
					setInvoicesSelected={setInvoicesSelected}
					endOfMonth
				/>
			</div>
			<br />
			<div className="px-8"></div>
			<Container>
				<DataTable
					ref={dataTableReference}
					value={data}
					paginator
					showGridlines
					rows={100}
					paginatorPosition="top"
					rowsPerPageOptions={[25, 50, 100]}
					loading={isLoading}
					dataKey="index"
					groupRowsBy="job_id"
					sortField="job_id"
					sortOrder={-1}
					rowGroupMode="subheader"
					rowGroupHeaderTemplate={headerRow}
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					selection={invoicesSelected}
					onSelectionChange={(e) => setInvoicesSelected(e.value)}
					emptyMessage="No Invoices found.">
					<Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
					<Column field="invoiceType" header="Invoice Type" />
					<Column field="zone_label" header="Zone Label" />
					<Column field="type" header="Type" />
					<Column field="description" header="Description" />
					<Column field="on_hire" header="On Hire" />
					<Column field="erect_percent" header="% Erect" />
					<Column field="date_on_hire" header="Date On Hire" />
					<Column field="completed_date" header="Date Completed" />
					<Column field="days_on_hire" header="Days on Hire" />
					<Column
						field="weekly_hire_rate"
						header="Weekly Hire Rate"
						body={(row: { weekly_hire_rate: number }) => {
							return numberFormat.format(row.weekly_hire_rate || 0) || ''
						}}
					/>
					<Column
						field="total"
						header="Total"
						body={(row: { total: number }) => {
							return numberFormat.format(row.total || 0) || ''
						}}
					/>
					<Column field="quote_num" header="Quote" />
					<Column
						field="handover_url"
						header="Handover Certificate"
						body={(row: { handover_url: string }) => {
							if (row.handover_url) {
								return (
									<a href={row.handover_url} target="_blank" rel="noreferrer">
										Link
									</a>
								)
							}
							return <></>
						}}
					/>
					<Column
						field="updatedAt"
						header="Last Time updated"
						body={(row: { updatedAt: string }) => {
							return new Date(row.updatedAt).toLocaleDateString()
						}}
					/>
					<Column
						header="Edit"
						body={(rowData) => {
							return (
								<Link
									to={{
										pathname: AppRoutes.privateRoutes.editInvoice
											.replace(':id', rowData.id)
											.replace(
												':invoiceType',
												rowData.invoiceType === 'Weekly Hire'
													? 'weeklyHire'
													: 'edInvoice'
											),
									}}
									state={{ background: location, name: 'editInvoice' }}>
									<PencilSquareIcon className="h-4 w-4 text-gray-500" />
								</Link>
							)
						}}
					/>
					{enableCreateUpdate && (
						<Column
							header="Delete"
							body={(row) => <DeleteInvoice invoice={row} />}
						/>
					)}
				</DataTable>
			</Container>
		</div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerRow = (data: any) => (
	<span className="text-gray-900 font-bold">{`${data?.jobData?.job_num} - ${data?.jobData?.site}`}</span>
)
