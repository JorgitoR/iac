import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { VehicleServices, DataTableServices } from 'services'
import { Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { VehiclesForm } from 'components/Vehicles'
import { PencilIcon } from '@heroicons/react/24/solid'
import { Link, useLocation } from 'react-router-dom'
import { AppRoutes } from 'config'

export const VehiclesMainTable = () => {
	const location = useLocation()
	const { data, isLoading } = VehicleServices.useVehicles()
	const [openVehicleForm, setOpenVehicleForm] = useState(false)

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
				filterName: 'Status',
				filterInitialValue: 'Active',
				filterInitialMatchMode: FilterMatchMode.EQUALS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: ['Active', 'Inactive'],
			},
			{
				filterName: 'OperationalStatus',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: ['Operational', 'Issue'],
			},
			{
				filterName: 'RegoDue_date',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.date,
				filterOptions: [],
			},
			{
				filterName: 'WOFDate_date',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.date,
				filterOptions: [],
			},
			{
				filterName: 'ServiceDueDate_date',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.date,
				filterOptions: [],
			},
		],
		aditionalGlobalFilterFields: ['Rego', 'Make', 'Model'],
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
			<PageHeading
				title="Vehicles"
				createBtn="Create Vehicle"
				isEditable={false}
				setOpen={setOpenVehicleForm}
			/>
			<Container>
				<DataTable
					ref={dataTableReference}
					value={data}
					loading={isLoading}
					paginator
					showGridlines
					rows={100}
					paginatorPosition="top"
					rowsPerPageOptions={[25, 50, 100]}
					dataKey="id"
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					emptyMessage="No Vehicles found."
					sortOrder={1}
					sortField="CodeName"
					multiSortMeta={[
						{
							field: 'codeName',
							order: 1,
						},
					]}>
					<Column
						field="Rego"
						header="Rego"
						body={(rowData: { id: string; Rego: string }) => {
							return (
								<Link
									to={AppRoutes.privateRoutes.VehiclesDetail.replace(
										':id',
										rowData.id || ''
									)}>
									{rowData.Rego}
								</Link>
							)
						}}
					/>
					<Column field="CodeName" header="Code Name" sortable />
					<Column field="Make" header="Make" />
					<Column field="Model" header="Model" />
					<Column field="Odometer" header="Odometer" />
					<Column field="Hubo" header="Hubo" />
					<Column field="RUC" header="RUC" />
					<Column
						field="RegoDue_date"
						header="Rego Due"
						body={(rowData: { RegoDue: string }) => rowData.RegoDue}
						{...FilterColumn.RegoDue_date}
					/>
					<Column
						field="WOFDate_date"
						header="COF/WOF Due"
						body={(rowData: { WOFDate: string }) => rowData.WOFDate}
						{...FilterColumn.WOFDate_date}
					/>
					<Column
						field="ServiceDueDate_date"
						header="Service Due Date"
						body={(rowData: { ServiceDueDate: string }) =>
							rowData.ServiceDueDate
						}
						{...FilterColumn.ServiceDueDate_date}
					/>
					<Column field="ServiceDueKm" header="Service Due KM" />
					<Column field="last_checked" header="Last Checked" />
					<Column field="checked_by" header="Checked By" />
					<Column field="safety" header="Safety" />
					<Column
						field="OperationalStatus"
						header="Operational Status"
						{...FilterColumn.OperationalStatus}
					/>
					<Column field="Status" header="Status" {...FilterColumn.Status} />
					<Column
						field="id"
						header="Edit"
						exportable={false}
						body={(rowData: { id: string }) => {
							return (
								<Link
									to={{
										pathname: AppRoutes.privateRoutes.VehiclesEdit.replace(
											':id',
											rowData.id || ''
										),
									}}
									state={{ background: location, name: 'editVehicle' }}>
									<PencilIcon className="text-gray-600 h-4 w-4" />
								</Link>
							)
						}}
					/>
				</DataTable>
			</Container>
			<VehiclesForm
				open={openVehicleForm}
				setOpen={setOpenVehicleForm}
				heading="Create Vehicle"
				formType="create"
			/>
		</div>
	)
}
