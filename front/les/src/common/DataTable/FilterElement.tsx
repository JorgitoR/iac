import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { ColumnFilterElementTemplateOptions } from 'primereact/column'
import { Calendar } from 'primereact/calendar'

interface FilterElementProps {
	filterValue: string
	filterOptions: string[]
	options: ColumnFilterElementTemplateOptions
	filterDate?: boolean
}

export const FilterElement = ({
	filterValue,
	filterOptions,
	options,
	filterDate,
}: FilterElementProps) => {
	if (filterDate) {
		return (
			<Calendar
				value={options.value}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				dateFormat="dd/mm/yy"
				placeholder="dd/mm/yyyy"
				mask="99/99/9999"
			/>
		)
	}
	return (
		<Dropdown
			value={filterValue}
			options={filterOptions}
			onChange={(e: DropdownChangeEvent) =>
				options.filterCallback(e.value, options.index)
			}
			placeholder="Select One"
			className="p-column-filter"
			showClear
		/>
	)
}
