import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { TimesheetServices, DataTableServices } from 'services'
import { Badge, Container, DataTableHeader, PageHeading } from 'common'
import { Column } from 'primereact/column'
import moment from 'moment'
import { ApproveTimesheet } from 'components/Timesheets'

export const TimesheetsMainTable = () => {
	const [timesheetsSelected, setTimesheetsSelected] = useState(null)
	const { data, isLoading } = TimesheetServices.useTimesheets()

	const {
		clearFilter,
		filters,
		globalFilterValue,
		setFilters,
		setGlobalFilterValue,
		globalFilterFields,
		dataTableReference,
	} = DataTableServices.useFiltersDataTable({
		initialFilters: [],
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
			<PageHeading title="Timesheets" />
			<Container>
				<div className="flex justify-between ml-4">
					<ApproveTimesheet />
				</div>
				<DataTable
					ref={dataTableReference}
					value={data}
					loading={isLoading}
					paginator
					showGridlines
					rows={100}
					paginatorPosition="top"
					rowGroupMode="subheader"
					groupRowsBy="staff.staff_name"
					rowGroupHeaderTemplate={headerTemplate}
					rowGroupFooterTemplate={footerTemplate}
					rowsPerPageOptions={[25, 50, 100]}
					dataKey="id"
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					selection={timesheetsSelected}
					onSelectionChange={(e) => setTimesheetsSelected(e.value as never)}
					emptyMessage="No Timesheets found.">
					<Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
					<Column field="staff.staff_name" header="Staff" />
					<Column
						header="Date"
						filterField="date"
						dataType="date"
						style={{ minWidth: '10rem' }}
						filter
						filterType="date"
					/>
					<Column
						header="Actual Start"
						field="actual_start"
						filterField="time_on"
						style={{ minWidth: '10rem' }}
					/>
					<Column
						header="Adjusted Start"
						field="time_on"
						filterField="time_on"
						style={{ minWidth: '10rem' }}
					/>

					<Column
						field="actual_finish"
						header="Actual Finish"
						filterMenuStyle={{ width: '14rem' }}
						style={{ minWidth: '12rem' }}
					/>
					<Column
						field="time_off"
						header="Adjusted Finish"
						filterMenuStyle={{ width: '14rem' }}
						style={{ minWidth: '12rem' }}
					/>
					<Column
						header="Total Hours"
						body={(row) => {
							const start = moment(row.time_on, 'HH:mm')
							const finish = moment(row.time_off, 'HH:mm')

							if (row.time_off && finish) {
								const duration = moment.duration(finish.diff(start))
								const hours = duration.asHours() - 0.5
								return <span>{hours.toFixed(2)}</span>
							}
							return <span />
						}}
						showFilterMatchModes={false}
						style={{ minWidth: '4rem' }}
					/>
					<Column
						header="Lunch Break"
						body={() => {
							const text = '30'
							return text
						}}
						showFilterMatchModes={false}
						style={{ minWidth: '4rem' }}
					/>
					<Column
						field="comments"
						header="Comments"
						bodyClassName="p-text-center"
						style={{ minWidth: '8rem' }}
					/>
					<Column
						header="Status"
						bodyClassName="p-text-center"
						style={{ width: '4rem' }}
						body={(row) => <Badge type={row.status} text={row.status} />}
					/>
					<Column field="" body="Edit" />
				</DataTable>
			</Container>
		</div>
	)
}

const headerTemplate = (data: {
	staff: {
		staff_name: string
	}
}) => <span className="text-gray-900 font-bold">{data.staff.staff_name}</span>

const footerTemplate = () => (
	<>
		<td
			colSpan={7}
			style={{ textAlign: 'right' }}
			className="bg-gray-100 font-normal">
			Total Hours
		</td>
	</>
)
