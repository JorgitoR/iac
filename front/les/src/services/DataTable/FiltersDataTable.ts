import { useEffect, useRef, useState } from 'react'
import { DataTableFilterMeta } from 'primereact/datatable'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import {
	ColumnFilterElementTemplateOptions,
	ColumnFilterMatchModeOptions,
	ColumnProps,
} from 'primereact/column'
import { FilterElement } from 'common/DataTable'

interface FiltersDataTableRow {
	filterName: string
	filterInitialValue: string | number | null
	filterInitialMatchMode: FilterMatchMode
	filterOptionsMatchOptions: tableFilterMatchModeOptions
	filterOptions: string[]
	typeFilterOperator?: string
}

export enum tableFilterMatchModeOptions {
	equalsOrNot = 'equalsOrNot',
	containsOrNot = 'containsOrNot',
	date = 'date',
}

interface FiltersDataTable {
	initialFilters: FiltersDataTableRow[]
	aditionalGlobalFilterFields?: string[]
}

const filterMatchModeOptionsEquals = [
	FilterMatchMode.EQUALS,
	FilterMatchMode.NOT_EQUALS,
] as unknown as ColumnFilterMatchModeOptions[]

const filterMatchModeOptionsContains = [
	FilterMatchMode.CONTAINS,
	FilterMatchMode.NOT_CONTAINS,
] as unknown as ColumnFilterMatchModeOptions[]

const filterMatchModeOptionsDate = [
	FilterMatchMode.DATE_IS,
	FilterMatchMode.DATE_IS_NOT,
	FilterMatchMode.DATE_BEFORE,
	FilterMatchMode.DATE_AFTER,
] as unknown as ColumnFilterMatchModeOptions[]

interface FilterColumn {
	[key: string]: ColumnProps
}

export const useFiltersDataTable = (FiltersDataTable: FiltersDataTable) => {
	const [filters, setFilters] = useState<DataTableFilterMeta | undefined>(
		undefined
	)
	const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
	const [globalFilterFields, setGlobalFilterFields] = useState<string[]>([])
	const [FilterColumn, setFilterColumn] = useState<FilterColumn>({})
	const dataTableReference = useRef(null)

	useEffect(() => {
		initFilters()
		makeFilterColumn()
		makeGlobalFilterFields()
	}, [])

	const makeFilterColumn = () => {
		const newFilterColumn = FiltersDataTable.initialFilters.reduce(
			(acc, { filterName, filterOptions, filterOptionsMatchOptions }) => {
				let filterMatchModeOptions = undefined
				if (
					filterOptionsMatchOptions === tableFilterMatchModeOptions.equalsOrNot
				) {
					filterMatchModeOptions = filterMatchModeOptionsEquals
				} else if (
					filterOptionsMatchOptions === tableFilterMatchModeOptions.date
				) {
					filterMatchModeOptions = filterMatchModeOptionsDate
				} else if (
					filterOptionsMatchOptions ===
					tableFilterMatchModeOptions.containsOrNot
				) {
					filterMatchModeOptions = filterMatchModeOptionsContains
				}

				const dataType =
					filterOptionsMatchOptions === tableFilterMatchModeOptions.date
						? 'string'
						: 'date'
				return {
					...acc,
					[filterName]: {
						filter: true,
						showFilterOperator: false,
						dataType,
						filterMatchModeOptions,
						filterElement: (options: ColumnFilterElementTemplateOptions) =>
							FilterElement({
								filterValue: options.value,
								filterOptions,
								options,
								filterDate:
									filterOptionsMatchOptions ===
									tableFilterMatchModeOptions.date,
							}),
					},
				}
			},
			{}
		)
		setFilterColumn(newFilterColumn)
	}

	const makeGlobalFilterFields = (): void => {
		const newGlobalFilterFields = FiltersDataTable.initialFilters.map((row) => {
			return row.filterName
		})
		if (FiltersDataTable.aditionalGlobalFilterFields) {
			newGlobalFilterFields.push(
				...FiltersDataTable.aditionalGlobalFilterFields
			)
		}

		setGlobalFilterFields(newGlobalFilterFields)
	}

	const initFilters = (reset?: boolean): void => {
		const customFilters = FiltersDataTable.initialFilters.reduce(
			(
				acc,
				{
					filterName,
					filterInitialValue,
					filterInitialMatchMode,
					typeFilterOperator,
				}
			) => {
				return {
					...acc,
					[filterName]: {
						operator: typeFilterOperator
							? typeFilterOperator
							: FilterOperator.OR,
						constraints: [
							{
								value: reset ? null : filterInitialValue,
								matchMode: reset
									? FilterMatchMode.CONTAINS
									: filterInitialMatchMode,
							},
						],
					},
				}
			},
			{}
		)

		setFilters({
			global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			...customFilters,
		})
		setGlobalFilterValue('')
	}

	const clearFilter = (): void => {
		initFilters(true)
	}

	return {
		filters,
		setFilters,
		clearFilter,
		FilterColumn,
		globalFilterValue,
		globalFilterFields,
		dataTableReference,
		setGlobalFilterValue,
	}
}
