import { RefObject } from 'react'
import { Button } from 'primereact/button'
import { DataTableFilterMeta } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'

interface customFilterProps {
	field: string
	value: string
	color: 'success' | 'warning' | 'danger'
}

interface TableHeaderProps {
	clearFilter: () => void
	globalFilterValue: string
	filters: DataTableFilterMeta | undefined
	setFilters(filters: DataTableFilterMeta): void
	setGlobalFilterValue(newValue: string): void
	dataTableReference?: RefObject<unknown>
	customFilters?: customFilterProps[]
	ActionName?: string
	clearBtnLabel?: string
	setOpen?: (open: boolean) => void
	disableButtons?: boolean
}

export const DataTableHeader = ({
	clearFilter,
	globalFilterValue,
	filters,
	setFilters,
	dataTableReference,
	setGlobalFilterValue,
	customFilters,
	ActionName,
	setOpen,
	disableButtons,
}: TableHeaderProps) => {
	const handleChangeGlobalFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		const _filters = { ...filters }

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// this is a hack to get around the fact that the type definition for DataTableFilterMeta is wrong
		_filters['global'].value = newValue

		setFilters(_filters)
		setGlobalFilterValue(newValue)
	}

	const exportCSV = () => {
		if (dataTableReference?.current) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// this is a hack to get around the fact that the type definition for DataTableFilterMeta is wrong
			dataTableReference.current.exportCSV()
		}
	}

	return (
		<>
			{ActionName && setOpen && (
				<div className="py-4">
					<Button
						type="button"
						className="!bg-blue-600 text-white hover:bg-gray-50:text-blue-600 py-2 px-2 text-md rounded-md shadow-sm font-medium focus:outline-none"
						label={ActionName}
						onClick={() => setOpen(true)}
					/>
				</div>
			)}

			<div className="flex justify-content-between space-x-3">
				{!disableButtons && (
					<>
						<Button
							type="button"
							icon="pi pi-filter-slash"
							label="Clear"
							outlined
							onClick={clearFilter}
						/>
						{customFilters?.length &&
							customFilters?.map((filter, index) => (
								<Button
									key={index}
									type="button"
									icon="pi pi-filter"
									label={filter.value}
									outlined
									className={`p-button-${filter.color}`}
									onClick={() => {
										const _filters = { ...filters }
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										// this is a hack to get around the fact that the type definition for DataTableFilterMeta is wrong
										_filters[filter.field].value = filter.value
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										_filters[filter.field].constraints = [
											{
												value: filter.value,
												matchMode: FilterMatchMode.EQUALS,
											},
										]
										setFilters(_filters)
									}}
								/>
							))}
					</>
				)}
				<span className="">
					<InputText
						value={globalFilterValue}
						onChange={handleChangeGlobalFilter}
						placeholder="Search"
						className="pr-4"
					/>
				</span>
			</div>
			<br />
			{!disableButtons && (
				<div className="flex justify-content-between space-x-3">
					<Button
						type="button"
						icon="pi pi-file"
						label="Export"
						outlined
						onClick={exportCSV}
					/>
				</div>
			)}
		</>
	)
}
