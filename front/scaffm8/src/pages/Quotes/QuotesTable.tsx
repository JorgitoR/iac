import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import {
	FolderOpenIcon,
	DocumentArrowDownIcon,
	PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { PageHeading, Container, DataTableHeader } from 'common'
import { DataTableServices, QuoteServices } from 'services'

import { EmailStatus, ApproveQuote, DeclineQuote } from 'components/Quotes'

import { AppRoutes } from 'config'
import { Link } from 'react-router-dom'
import { numberFormat } from 'utilities'
import { FilterMatchMode } from 'primereact/api'
import { tableFilterMatchModeOptions } from 'services/DataTable'

export const QuotesMainTable = () => {
	const { data, isLoading } = QuoteServices.useQuotes()
	const {
		clearFilter,
		filters,
		globalFilterValue,
		setFilters,
		setGlobalFilterValue,
		globalFilterFields,
		dataTableReference,
	} = DataTableServices.useFiltersDataTable({
		initialFilters: [
			{
				filterInitialMatchMode: FilterMatchMode.EQUALS,
				filterInitialValue: 'Pending',
				filterName: 'status',
				filterOptions: ['Pending', 'Approved', 'Declined'],
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
			},
		],
		aditionalGlobalFilterFields: [
			'quote_num',
			'clientData.client_name',
			'contactData.name',
			'status',
		],
	})

	const header = DataTableHeader({
		clearFilter,
		globalFilterValue,
		filters,
		setFilters,
		setGlobalFilterValue,
		dataTableReference,
		customFilters: [
			{
				field: 'status',
				value: 'Approved',
				color: 'success',
			},
			{
				field: 'status',
				value: 'Declined',
				color: 'danger',
			},
			{
				field: 'status',
				value: 'Pending',
				color: 'warning',
			},
		],
	})

	return (
		<>
			<PageHeading
				title="Quotes"
				createBtn={'Create Quote'}
				navigate={AppRoutes.privateRoutes.QuotesCreate}
			/>
			<Container>
				<div style={{ width: '100%', overflowX: 'auto' }}>
					<DataTable
						ref={dataTableReference}
						value={data}
						paginator
						showGridlines
						rows={100}
						rowsPerPageOptions={[10, 25, 50, 100]}
						loading={isLoading}
						dataKey="id"
						sortField="id"
						sortOrder={-1}
						filters={filters}
						globalFilterFields={globalFilterFields}
						header={header}
						responsiveLayout="scroll"
						emptyMessage="No Quotes found.">
						<Column
							field="createdAt"
							header="Created At"
							body={(rowData) => {
								return (
									<span>
										{new Date(rowData.createdAt).toLocaleDateString()}
									</span>
								)
							}}
						/>
						<Column
							field="quote_num"
							header="Quote # (Details)"
							body={(rowData) => {
								return (
									<Link
										to={AppRoutes.privateRoutes.QuotesDetail.replace(
											':id',
											rowData.id
										)}
										className="flex items-center">
										<FolderOpenIcon className="h-4 w-4 text-gray-500" />
										{rowData.quote_num}
									</Link>
								)
							}}
						/>
						<Column field="clientData.client_name" header="Client Name" />
						<Column field="contactData.name" header="Contact Name" />
						<Column field="contactData.email" header="Contact Email" />
						<Column
							field="street"
							header="Site Address"
							style={{ maxWidth: '90px', textAlign: 'left' }}
							headerStyle={{ maxWidth: '90px' }}
						/>
						<Column
							field="estimatorData.staff_name"
							header="Estimator"
							style={{ maxWidth: '70px', textAlign: 'left' }}
						/>
						<Column
							field="total"
							header="Total Amount"
							body={(rowData) => {
								return <span>{numberFormat.format(rowData.total)}</span>
							}}
						/>
						<Column
							field="emailStatus"
							header="Email Status"
							body={(rowData) => {
								return (
									<EmailStatus
										quote={rowData}
										emailStatus={rowData.emailStatus}
										quoteId={rowData.id}
									/>
								)
							}}
						/>
						<Column
							field="updatedAt"
							header="Last updated"
							body={(rowData) => {
								return (
									<span>
										{new Date(rowData.updatedAt).toLocaleDateString()}
									</span>
								)
							}}
						/>
						<Column
							field="id"
							header="Approve"
							exportable={false}
							body={(rowData) => {
								return (
									<ApproveQuote quoteId={rowData.id} status={rowData.status} />
								)
							}}
						/>
						<Column
							field="id"
							header="Decline"
							exportable={false}
							body={(rowData) => {
								return (
									<DeclineQuote quoteId={rowData.id} status={rowData.status} />
								)
							}}
						/>
						<Column
							field="id"
							header="Edit"
							exportable={false}
							bodyStyle={{ alignItems: 'center' }}
							body={(rowData) => {
								if (rowData.status !== 'Pending') {
									return <PencilSquareIcon className="h-4 w-4 text-gray-200" />
								}
								return (
									<Link
										to={AppRoutes.privateRoutes.QuotesEdit.replace(
											':id',
											rowData.id
										)}
										className="flex justify-center items-center">
										<PencilSquareIcon className="h-4 w-4 text-gray-500" />
									</Link>
								)
							}}
						/>
						<Column
							field="id"
							header="Export"
							exportable={false}
							bodyStyle={{ alignContent: 'center' }}
							body={(rowData) => {
								return (
									<Link
										to={AppRoutes.privateRoutes.QuotesPDF.replace(
											':id',
											rowData.id
										)}
										className="flex justify-center items-center">
										<DocumentArrowDownIcon className="h-4 w-4 text-gray-500" />
									</Link>
								)
							}}
						/>
					</DataTable>
				</div>
			</Container>
		</>
	)
}
