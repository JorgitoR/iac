import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import {
	DataTableServices,
	VisitServices,
	StaffServices,
	VehicleServices,
	JobsServices,
} from 'services'
import { Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'

import { VisitForm } from 'components/Visits'
import { Link, useLocation } from 'react-router-dom'
import { AppRoutes } from 'config'
import { PencilIcon } from '@heroicons/react/24/solid'

export const VisitsMainTable = () => {
	const location = useLocation()
	const [openVisitForm, setOpenVisitForm] = useState(false)
	const { data, isLoading } = VisitServices.useVisits()
	const { data: staffData, isLoading: staffLoading } = StaffServices.useStaff()
	const { data: vehicleData, isLoading: vehicleLoading } =
		VehicleServices.useVehicles()
	const { data: taskData, isLoading: taskLoading } = JobsServices.useTask()

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
				filterName: 'status',
				filterInitialValue: 'Active',
				filterInitialMatchMode: FilterMatchMode.EQUALS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: ['Active', 'Inactive'],
			},
			{
				filterName: 'visit_status',
				filterInitialValue: 'Completed',
				filterInitialMatchMode: FilterMatchMode.NOT_EQUALS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [
					'Pending Prestart',
					'Pending Close Of Visit',
					'Completed',
				],
			},
		],
		aditionalGlobalFilterFields: [
			'jobData.job_num',
			'teamLeaderData.staff_name',
			'jobData.site',
			'notes',
			'visit_status',
			'type',
		],
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
				title="Visits"
				createBtn="Create Visit"
				isEditable={false}
				setOpen={setOpenVisitForm}
			/>
			<Container>
				<DataTable
					ref={dataTableReference}
					value={data}
					loading={isLoading || staffLoading || vehicleLoading || taskLoading}
					paginator
					showGridlines
					rows={100}
					paginatorPosition="top"
					rowsPerPageOptions={[25, 50, 100]}
					dataKey="id"
					sortField="visitDate"
					rowGroupHeaderTemplate={subHeader}
					sortOrder={-1}
					rowGroupMode="subheader"
					groupRowsBy="date"
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={header}
					emptyMessage="No Visits found.">
					<Column
						field="date"
						header="Date"
						body={(rowData: { date: string; job_id: string }) => {
							return (
								<Link
									to={AppRoutes.privateRoutes.JobsDetail.replace(
										':id',
										rowData.job_id
									)}>
									{rowData.date}
								</Link>
							)
						}}
					/>
					<Column field="jobData.job_num" header="Job Number" />
					<Column field="jobData.site" header="Site" />
					<Column field="teamLeaderData.staff_name" header="Team Leader" />
					<Column
						field="staff_ids"
						header="Staff"
						body={(rowData: { staff_ids: string[] }) => {
							return rowData.staff_ids.map((staff_id) => {
								if (!staffData) return null
								const staff = staffData.find(
									(item) => Number(item.id) === Number(staff_id)
								)
								return (
									<span key={staff?.id}>
										{staff?.staff_name}
										<br />
									</span>
								)
							})
						}}
					/>
					<Column field="time_on" header="Start Time" />
					<Column
						field="vehicle_ids"
						header="Vehicles"
						body={(rowData: { vehicle_ids: string[] }) => {
							return rowData.vehicle_ids.map((vehicle_id) => {
								if (!vehicleData) return null
								const vehicle = vehicleData.find(
									(item: { id: string }) =>
										Number(item.id) === Number(vehicle_id)
								)
								return (
									<span key={vehicle?.id}>
										{vehicle?.Rego}
										<br />
									</span>
								)
							})
						}}
					/>
					<Column
						field="task_ids"
						header="Task"
						body={(rowData: { task_ids: string[] }) => {
							return rowData.task_ids.map((task_id) => {
								if (!taskData) return null
								const task = taskData.find(
									(item: { id: string }) => Number(item.id) === Number(task_id)
								)

								return (
									<span key={task?.id}>
										{task?.type}
										<br />
									</span>
								)
							})
						}}
					/>
					<Column field="notes" header="Notes" />
					<Column field="type" header="Type" />
					<Column
						field="visit_status"
						header="Visit Status"
						{...FilterColumn.visit_status}
					/>
					<Column field="status" header="Status" {...FilterColumn.status} />
					<Column
						header="Edit"
						body={(rowData) => (
							<Link
								to={{
									pathname: AppRoutes.privateRoutes.visitsEdit.replace(
										':id',
										rowData.id
									),
								}}
								state={{ background: location, name: 'editVisit' }}>
								<PencilIcon className="text-gray-600 h-4 w-4" />
							</Link>
						)}
					/>
				</DataTable>
			</Container>
			<VisitForm
				heading="Create Visit"
				setOpen={setOpenVisitForm}
				formType="create"
				open={openVisitForm}
			/>
		</div>
	)
}

const subHeader = (data: { date: string }) => (
	<span className="text-gray-900 font-bold">{data.date}</span>
)
