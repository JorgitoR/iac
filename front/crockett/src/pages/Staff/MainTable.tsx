import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Column } from 'primereact/column'
import { PencilIcon } from '@heroicons/react/24/solid'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'

import { Badge, Container, DataTableHeader, PageHeading } from 'common'
import { AppRoutes } from 'config'
import { StaffForm } from 'components/Staff'
import { DataTableServices, StaffServices } from 'services'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { StaffStatusOptions, StaffTypeOptions } from 'models/staff.model'

export function StaffMainTable() {
	const location = useLocation()
	const { data, isLoading, enableCreateUpdate } = StaffServices.useStaff()
	const [openStaffForm, setOpenStaffForm] = useState(false)

	const {
		clearFilter,
		filters,
		globalFilterValue,
		setFilters,
		setGlobalFilterValue,
		globalFilterFields,
		FilterColumn,
		dataTableReference,
	} = DataTableServices.useFiltersDataTable({
		initialFilters: [
			{
				filterName: 'staff_name',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [],
			},
			{
				filterName: 'type',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: StaffTypeOptions,
			},
			{
				filterName: 'work_status',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.DATE_IS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: ['Signed In', 'Signed Out'],
			},
			{
				filterName: 'status',
				filterInitialValue: 'Active',
				filterInitialMatchMode: FilterMatchMode.EQUALS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: StaffStatusOptions,
			},
		],
		aditionalGlobalFilterFields: ['mobile', 'position', 'pin'],
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
				title="Staff"
				createBtn={enableCreateUpdate ? 'Create Staff' : undefined}
				isEditable={false}
				setOpen={setOpenStaffForm}
			/>
			<Container>
				<DataTable
					ref={dataTableReference}
					value={data}
					paginator
					showGridlines
					rows={100}
					rowsPerPageOptions={[25, 50, 100]}
					loading={isLoading}
					dataKey="id"
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					emptyMessage="No Staff found.">
					<Column
						header="Staff Name (Details)"
						field="staff_name"
						filter
						showFilterOperator={false}
						filterPlaceholder="Search by name"
						style={{ minWidth: '10rem' }}
						body={(row) => (
							<Link
								to={AppRoutes.privateRoutes.StaffDetail.replace(
									':id',
									row.id || ''
								)}>
								{row.staff_name}
							</Link>
						)}
					/>
					<Column
						header="Type"
						field="type"
						style={{ minWidth: '6rem' }}
						{...FilterColumn.type}
					/>
					<Column header="Phone" field="mobile" style={{ minWidth: '10rem' }} />
					<Column
						header="Position"
						field="position"
						style={{ minWidth: '10rem' }}
					/>
					<Column header="PIN" field="pin" style={{ minWidth: '4rem' }} />
					<Column
						header="Sign In / Out Time"
						field="in_out_time"
						style={{ maxWidth: '3rem' }}
					/>
					<Column
						header="Signed In / Out"
						field="work_status"
						bodyClassName="p-text-center"
						style={{ width: '7rem' }}
						body={(row) => (
							<Badge type={row.work_status} text={row.work_status} />
						)}
						{...FilterColumn.work_status}
						filterMenuStyle={{ width: '14rem' }}
					/>
					<Column
						header="Status"
						field="status"
						bodyClassName="p-text-center"
						style={{ width: '6rem' }}
						body={(row) => <Badge type={row.status} text={row.status} />}
						{...FilterColumn.status}
					/>
					{enableCreateUpdate && (
						<Column
							header="Edit"
							bodyClassName="p-text-center"
							style={{ width: '3rem' }}
							body={(row) => (
								<Link
									to={{
										pathname: AppRoutes.privateRoutes.StaffEdit.replace(
											':id',
											row.id || ''
										),
									}}
									state={{ background: location, name: 'editStaff' }}>
									<PencilIcon className="text-gray-600 h-4 w-4" />
								</Link>
							)}
						/>
					)}
				</DataTable>
			</Container>
			<StaffForm
				formType="create"
				heading="Create Staff"
				open={openStaffForm}
				setOpen={setOpenStaffForm}
			/>
		</div>
	)
}
