import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Column } from 'primereact/column'
import { PencilIcon } from '@heroicons/react/24/solid'
import { DataTable } from 'primereact/datatable'

import { Badge, Container, DataTableHeader, PageHeading } from 'common'
import { AppRoutes } from 'config'
import { DataTableServices, ScaffolRegisterServices } from 'services'
import { ScaffoldRegisterFrom } from 'components/ScaffoldRegister'
import { FilterMatchMode } from 'primereact/api'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { dateFormat } from 'utilities'

export function ScaffoldRegisterMainTable() {
	const location = useLocation()
	const { data, isLoading, enableCreateUpdate } =
		ScaffolRegisterServices.useScaffoldRegister()
	const [openTagForm, setOpenTagForm] = useState(false)
	console.log(openTagForm)

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
				filterName: 'tag_no',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [],
			},
			{
				filterName: 'last_inspection_date',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.date,
				filterOptions: [],
			},
			{
				filterName: 'inspection_due_date',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.date,
				filterOptions: [],
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
			<PageHeading title="Scaffold Register" setOpen={setOpenTagForm} />
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
					emptyMessage="No Scaffold Register found.">
					<Column
						header="Tag # (Details)"
						field="tag_no"
						filter
						showFilterOperator={false}
						filterPlaceholder="Search by tag Number or Name"
						style={{ minWidth: '10rem' }}
						body={(row) => (
							<Link
								to={AppRoutes.privateRoutes.scaffoldRegisterDetail.replace(
									':id',
									row.id || ''
								)}>
								{row.tag_no}
							</Link>
						)}
					/>
					<Column
						header="Description"
						field="description"
						style={{ minWidth: '6rem' }}
						{...FilterColumn.supervisor}
					/>
					<Column
						header="Last Inspection"
						field="last_inspection_date"
						body={(row) =>
							row.last_inspection
								? dateFormat.format(row.last_inspection_date)
								: null
						}
						style={{ minWidth: '10rem' }}
						{...FilterColumn.last_inspection_date}
					/>
					<Column
						header="Inspection Due"
						field="inspection_due_date"
						body={(row) =>
							row.inspection_due
								? dateFormat.format(row.inspection_due_date)
								: null
						}
						style={{ minWidth: '10rem' }}
						{...FilterColumn.inspection_due_date}
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
										pathname:
											AppRoutes.privateRoutes.scaffoldRegisterEdit.replace(
												':id',
												row.id || ''
											),
									}}
									state={{
										background: location,
										name: 'editScaffoldRegister',
									}}>
									<PencilIcon className="text-gray-600 h-4 w-4" />
								</Link>
							)}
						/>
					)}
				</DataTable>
			</Container>
			<ScaffoldRegisterFrom
				formType="create"
				heading="Create Scaffold Register"
				open={openTagForm}
				setOpen={setOpenTagForm}
			/>
		</div>
	)
}
