import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { InvoiceServices, DataTableServices } from 'services'
import { Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { numberFormat } from 'utilities'

export const ApprovedInvoicesTable = () => {
	const { data, isLoading } = InvoiceServices.useInvoices('Approved')

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
				filterOptionsMatchOptions: tableFilterMatchModeOptions.containsOrNot,
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
					rowGroupMode="subheader"
					rowGroupHeaderTemplate={headerRow}
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					emptyMessage="No Invoices found.">
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
							return numberFormat.format(row.weekly_hire_rate || 0)
						}}
					/>
					<Column
						field="total"
						header="Total"
						body={(row: { total: number }) => {
							return numberFormat.format(row.total || 0)
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
					<Column field="xero_reference" header="Invoice Number" />
				</DataTable>
			</Container>
		</div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerRow = (data: any) => (
	<span className="text-gray-900 font-bold">{`${data?.jobData?.job_num} - ${data?.jobData?.site}`}</span>
)
