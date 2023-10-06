import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { Button, Container, DataTableHeader } from 'common'
import { DataTableServices } from 'services'
import { PlusIcon } from '@heroicons/react/24/outline'

interface Columns {
	header: string
	field: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: (row: any) => JSX.Element | string
}

interface TableProps {
	title: string
	columns: Columns[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any[]
	isLoading: boolean
	DisableHeader?: boolean
	ActionName?: string
	setOpen?: (open: boolean) => void
	disablePaginator?: boolean
	disableButtons?: boolean
	setShowNotesForm?: (open: boolean) => void
}

export function Table({
	title,
	columns,
	data,
	isLoading,
	DisableHeader,
	ActionName,
	setOpen,
	disablePaginator,
	disableButtons,
	setShowNotesForm,
}: TableProps) {
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
		aditionalGlobalFilterFields: columns.map((column) => column.field),
	})

	const header = DataTableHeader({
		clearFilter,
		globalFilterValue,
		filters,
		setFilters,
		setGlobalFilterValue,
		dataTableReference,
		ActionName,
		setOpen,
		disableButtons,
	})

	return (
		<div className="card p-0.5">
			<>
				<h2 className="text-lg leading-6 font-medium text-gray-900 px-6 py-4">
					{title}
				</h2>
			</>
			{setShowNotesForm ? (
				<Button
					className="ml-6 mb-4"
					type="button"
					variant="primary"
					onClick={() => setShowNotesForm(true)}
					size="md"
					startIcon={<PlusIcon className="w-4 h-4" />}>
					Create Notes / File
				</Button>
			) : null}
			<Container>
				<DataTable
					ref={dataTableReference}
					value={data}
					paginator={!disablePaginator}
					showGridlines
					rows={disablePaginator ? data.length : 25}
					rowsPerPageOptions={disablePaginator ? [] : [10, 25, 50]}
					loading={isLoading}
					dataKey="id"
					filters={filters}
					globalFilterFields={globalFilterFields}
					header={DisableHeader ? null : header}
					emptyMessage="No Rows found.">
					{columns.map((column) => (
						<Column
							key={column.field}
							field={column.field}
							header={column.header}
							headerStyle={{ alignContent: 'flex-start' }}
							bodyStyle={{
								alignContent: 'flex-start',
								alignItems: 'flex-start',
								textAlign: 'left',
							}}
							body={(row) => {
								if (column.body) return column.body(row)
								return row[column.field]
							}}
							filterMatchMode={FilterMatchMode.CONTAINS}
						/>
					))}
				</DataTable>
			</Container>
		</div>
	)
}
