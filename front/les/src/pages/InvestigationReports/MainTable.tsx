import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { DataTableServices } from 'services'
import { Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { Link, useLocation } from 'react-router-dom'
import { PencilIcon, FolderIcon } from '@heroicons/react/24/solid'
import { AppRoutes } from 'config'
import { investigationReportsTypeOptions } from 'models/investigations.model'

export const InvestigationReportsTable = () => {
	const location = useLocation()
	//const { data, isLoading, enableCreateUpdate } = JobsServices.useJobs()
	const [openInvestigationForm, setOpenInvestigationForm] = useState(false)

	console.log(openInvestigationForm)

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
				filterName: 'type',
				filterInitialValue: '',
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: investigationReportsTypeOptions,
			},
			{
				filterName: 'completed',
				filterInitialValue: '',
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: ['Yes', 'No'],
			},
		],
		aditionalGlobalFilterFields: ['ID', 'type'],
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
				title="Incident and Injury register"
				createBtn="Create Incident"
				isEditable={false}
				setOpen={setOpenInvestigationForm}
			/>
			<Container>
				<DataTable
					ref={dataTableReference}
					value={[]}
					paginator
					showGridlines
					rows={100}
					paginatorPosition="top"
					rowsPerPageOptions={[25, 50, 100]}
					loading={false}
					dataKey="id"
					sortField="id"
					sortOrder={-1}
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					emptyMessage="No Investigation found.">
					<Column
						field="id"
						header="ID (Details)"
						style={{ width: '7rem' }}
						body={(rowData) => (
							<Link to="" className="flex items-center">
								<FolderIcon className="h-4 w-4 mx-2" />
								<span className="hover:text-gray-800">{`INV-${rowData.id}`}</span>
							</Link>
						)}
					/>
					<Column field="createdAt" header="Date" />
					<Column field="type" header="Type" {...FilterColumn.type} />
					<Column field="Address" header="address" />
					<Column field="note" header="What Happened" />
					<Column
						field="Serius"
						header="completed"
						{...FilterColumn.completed}
					/>
					<Column field="action_required" header="Corrective Actions" />
					{
						//enableCreateUpdate
						true && (
							<Column
								header="Edit"
								body={(rowData) => (
									<Link
										to={{
											pathname: AppRoutes.privateRoutes.JobsEdit.replace(
												':id',
												rowData.id
											),
										}}
										state={{ background: location, name: 'editJob' }}>
										<PencilIcon className="text-gray-600 h-4 w-4" />
									</Link>
								)}
							/>
						)
					}
				</DataTable>
			</Container>
		</div>
	)
}
