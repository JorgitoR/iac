import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { LeaveServices, DataTableServices } from 'services'
import { Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { dateFormat } from 'utilities'

export const ApprovedLeaveTable = () => {
	const { data, isLoading } = LeaveServices.useLeaves()

	const {
		clearFilter,
		filters,
		globalFilterValue,
		setFilters,
		setGlobalFilterValue,
		globalFilterFields,
		dataTableReference,
		FilterColumn,
	} = DataTableServices.useFiltersDataTable({
		initialFilters: [
			{
				filterName: 'startDate_date',
				filterInitialValue: '',
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.date,
				filterOptions: [],
			},
			{
				filterName: 'endDate_date',
				filterInitialValue: '',
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.date,
				filterOptions: [],
			},
		],
		aditionalGlobalFilterFields: ['staffData.staff_name', 'type'],
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
			<PageHeading title="Approved Leave" />
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
					dataKey="id"
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					emptyMessage="No Leave found.">
					<Column
						field="createdAt"
						header="Date"
						body={(rowData) => dateFormat.format(new Date(rowData.createdAt))}
					/>
					<Column field="staffData" header="Staff" />
					<Column field="type" header="Leave Type" />
					<Column
						field="startDate_date"
						header="Start Date"
						{...FilterColumn.startDate_date}
					/>
					<Column field="staffData.staff_name" header="Assigned To" />
					<Column
						field="endDate_date"
						header="End Date"
						{...FilterColumn.endDate_date}
					/>
					<Column field="totalDays" header="Total Days" />
					<Column field="comments" header="Comments" />
					<Column field="ApprovedBy" header="Approved By" />
				</DataTable>
			</Container>
		</div>
	)
}
