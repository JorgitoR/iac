export const OptionsForDropdown = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	arr: any[] | undefined,
	val: string | number,
	label: string | number
) => {
	if (!arr) {
		return []
	}

	return arr.map((item) => {
		return {
			value: item[val],
			label: item[label],
		}
	})
}

export const OptionsForDropdownFilter = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	arr: any[] | undefined,
	val: string | number,
	label: string | number | string[],
	filterKey: string | number,
	filterValue: string | number
) => {
	if (!arr) {
		return []
	}

	return arr
		.filter((item) => String(item[filterKey]) === String(filterValue))
		.map((item) => {
			if (Array.isArray(label)) {
				return {
					value: item[val],
					label: label.map((labelItem) => item[labelItem]).join(' - '),
				}
			}
			return {
				value: item[val],
				label: item[label],
			}
		})
}
