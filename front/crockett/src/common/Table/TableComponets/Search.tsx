import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface SearchProps {
	placeholder: string
	globalFilter: string
	setGlobalFilter: (filterValue: string | undefined) => void
}

export function Search({
	placeholder,
	globalFilter,
	setGlobalFilter,
}: SearchProps) {
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce((v) => {
		setGlobalFilter(v || undefined)
	}, 200)

	return (
		<div className="ml-1 mt-1 relative rounded-md sm:col-span-2">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<MagnifyingGlassIcon
					className="h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
			</div>
			<input
				type="text"
				className="focus:outline-none block pl-10 border-gray-200 py-2 text-md rounded-md sm:text-sm"
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value)
					onChange(e.target.value)
				}}
				placeholder={placeholder}
			/>
		</div>
	)
}
