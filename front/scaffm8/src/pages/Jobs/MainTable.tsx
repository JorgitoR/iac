import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { DataTableServices, JobsServices } from 'services'
import { Container, DataTableHeader, PageHeading, Badge } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { Link, useLocation } from 'react-router-dom'
import { PencilIcon, FolderIcon } from '@heroicons/react/24/solid'
import { AppRoutes } from 'config'
import { JobsComponents } from 'components'
import moment from 'moment'

export const JobsMainTable = () => {
	const location = useLocation()
	const { data, isLoading, enableCreateUpdate } = JobsServices.useJobs()
	const [openJobForm, setOpenJobForm] = useState(false)

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
				filterName: 'job_status',
				filterInitialValue: 'Completed',
				filterInitialMatchMode: FilterMatchMode.NOT_EQUALS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [
					'Pending Handover',
					'In Progress',
					'Completed',
					'Signed Off',
				],
			},
			{
				filterName: 'status',
				filterInitialValue: 'Active',
				filterInitialMatchMode: FilterMatchMode.EQUALS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: ['Active', 'Inactive'],
			},
		],
		aditionalGlobalFilterFields: ['job_num', 'site', 'clientData.client_name'],
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
				title="Jobs"
				createBtn="Create Job"
				isEditable={false}
				setOpen={setOpenJobForm}
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
					sortField="id"
					sortOrder={-1}
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					emptyMessage="No jobs found.">
					<Column
						field="job_num"
						header="Job #"
						style={{ width: '7rem' }}
						body={(rowData) => (
							<Link
								to={AppRoutes.privateRoutes.JobsDetail.replace(
									':id',
									rowData.id
								)}
								className="flex items-center">
								<FolderIcon className="h-4 w-4 mx-2" />
								<># {rowData.job_num}</>
							</Link>
						)}
					/>
					<Column field="clientData.client_name" header="Client" />
					<Column field="site" header="Site Address" />
					<Column
						field="start_date"
						header="Start Date"
						body={(rowData) => (
							<>
								{moment(new Date(rowData.start_date)).format('DD/MM/YYYY') ||
									''}
							</>
						)}
					/>
					<Column
						field="end_date"
						header="End Date"
						body={(rowData) => (
							<>
								{moment(new Date(rowData.end_date)).format('DD/MM/YYYY') || ''}
							</>
						)}
					/>
					<Column
						field="job_status"
						header="Job Status"
						{...FilterColumn.job_status}
					/>
					<Column field="on_hire" header="On Hire" {...FilterColumn.on_hire} />
					<Column field="notes" header="Notes" />
					<Column field="branding" header="Branding" hidden />
					<Column
						field="status"
						header="Status"
						bodyStyle={{ textAlign: 'center' }}
						body={(rowData) => (
							<Badge text={rowData.status} type={rowData.status} />
						)}
						{...FilterColumn.status}
					/>
					{enableCreateUpdate && (
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
					)}
				</DataTable>
			</Container>
			<JobsComponents.JobForm
				formType="create"
				heading="Create Job"
				open={openJobForm}
				setOpen={setOpenJobForm}
			/>
		</div>
	)
}
