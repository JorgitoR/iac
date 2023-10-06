import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { AssetServices, DataTableServices } from 'services'
import { Badge, Container, DataTableHeader, PageHeading } from 'common'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { Column } from 'primereact/column'
import { Link, useLocation } from 'react-router-dom'
import { PencilIcon } from '@heroicons/react/24/solid'
import { AppRoutes } from 'config'
import { AssetsForm } from 'components/Assets'
import { assetCategoriesOptions, assetTypeOptions } from 'models'

export const AssetsMainTable = () => {
	const location = useLocation()
	const { data, isLoading } = AssetServices.useAssets()
	const [openAssetsForm, setOpenAssetsForm] = useState(false)

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
				filterName: 'asset_type',
				filterInitialValue: '',
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: assetTypeOptions,
			},
			{
				filterName: 'asset_category',
				filterInitialValue: '',
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: assetCategoriesOptions.map((e) => e.value),
			},
		],
		aditionalGlobalFilterFields: ['manufacture_num', 'staffData.staff_name'],
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
				title="Assets"
				createBtn="Create Assets"
				isEditable={false}
				setOpen={setOpenAssetsForm}
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
					emptyMessage="No Assets found."
					tableStyle={{ alignItems: 'center' }}>
					<Column
						field="id"
						header="Asset # (Details)"
						body={(rowData) => (
							<Link
								to={`${AppRoutes.privateRoutes.AssetsDetail.replace(
									':id',
									rowData.id.toString()
								)}`}>
								{rowData.id}
							</Link>
						)}
					/>
					<Column field="manufacture_num" header="Manufactures #" />
					<Column
						field="asset_type"
						header="Asset Type"
						{...FilterColumn.asset_type}
					/>
					<Column
						field="asset_category"
						header="Asset Category"
						{...FilterColumn.asset_category}
					/>
					<Column field="staffData.staff_name" header="Assigned To" />
					<Column field="date_assigned" header="Date Assigned" />
					<Column field="last_inspected" header="Last Inspection" />
					<Column field="next_inspection" header="Next Inspection" />
					<Column field="asset_expiry" header="Asset Expiry" />
					<Column field="comments" header="Comments" />
					<Column
						field="status"
						header="Status"
						body={(rowData) => (
							<Badge text={rowData.status} type={rowData.status} />
						)}
						{...FilterColumn.status}
					/>
					<Column
						field="id"
						header="Edit"
						body={(rowData) => (
							<Link
								to={`${AppRoutes.privateRoutes.AssetsEdit.replace(
									':id',
									rowData.id.toString()
								)}`}
								state={{ background: location, name: 'editAsset' }}>
								<PencilIcon className="w-5 h-5" />
							</Link>
						)}
					/>
				</DataTable>
			</Container>
			<AssetsForm
				formType="create"
				heading="Create Asset"
				open={openAssetsForm}
				setOpen={setOpenAssetsForm}
			/>
		</div>
	)
}
