import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { ClientServices, DataTableServices } from 'services'
import { Badge, Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { Link, useLocation } from 'react-router-dom'
import { FolderOpenIcon, PencilIcon } from '@heroicons/react/24/solid'
import { AppRoutes } from 'config'
import { CreateClientsForm } from 'components/Clients'

export const ClientsMainTable = () => {
	const location = useLocation()
	const { data, isLoading } = ClientServices.useClients()
	const [openClientForm, setOpenClientForm] = useState(false)

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
				filterName: 'client_name',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [],
			},
			{
				filterName: 'status',
				filterInitialValue: 'Active',
				filterInitialMatchMode: FilterMatchMode.EQUALS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: ['Active', 'Inactive'],
			},
		],
		aditionalGlobalFilterFields: ['phone', 'email'],
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
				title="Clients"
				createBtn="Create Client"
				isEditable={false}
				setOpen={setOpenClientForm}
			/>
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
					emptyMessage="No Clients found.">
					<Column
						header="Client (Details)"
						field="client_name"
						style={{ maxWidth: '8rem', textAlign: 'center' }}
						body={(row) => (
							<Link
								key={`details${row.id}`}
								to={AppRoutes.privateRoutes.ClientsDetail.replace(
									':id',
									row.id || ''
								)}
								className="flex items-center">
								<FolderOpenIcon className="h-4 w-4 text-gray-500 mr-2" />
								<span className="hover:text-gray-800">{row.client_name}</span>
							</Link>
						)}
					/>
					<Column header="Phone" field="phone" style={{ minWidth: '10rem' }} />
					<Column header="Email" field="email" style={{ minWidth: '10rem' }} />
					<Column
						field="status"
						header="Status"
						bodyClassName="p-text-center"
						style={{ width: '6rem', textAlign: 'center' }}
						alignHeader={'center'}
						body={(row) => <Badge type={row.status} text={row.status} />}
						{...FilterColumn.status}
					/>
					<Column
						header="Edit"
						bodyClassName="p-text-center"
						style={{ width: '3rem' }}
						body={(row) => (
							<Link
								to={{
									pathname: AppRoutes.privateRoutes.ClientsEdit.replace(
										':id',
										row.id
									),
								}}
								state={{ background: location, name: 'editClient' }}>
								<PencilIcon className="text-gray-600 h-4 w-4" />
							</Link>
						)}
					/>
				</DataTable>
			</Container>
			<CreateClientsForm
				formType="create"
				heading="Create Client"
				open={openClientForm}
				setOpen={setOpenClientForm}
			/>
		</div>
	)
}
