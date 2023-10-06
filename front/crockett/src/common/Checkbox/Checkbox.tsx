import { useState } from 'react'

interface CheckboxProps {
	title: string
	options: Array<{ value: string; label: string }>
	id: string
	onChange: (id: string, values: string[]) => void
	values?: string[]
}

export function Checkbox({
	title,
	options,
	id,
	onChange,
	values = [],
}: CheckboxProps) {
	const [selected, setSelected] = useState<string[]>(values)

	const handleSelectedChange = (item: string) => {
		if (selected.includes(item)) {
			const selectedArr = selected.filter((selectVal) => selectVal !== item)
			setSelected(selectedArr)
			onChange(id, selectedArr)
		} else {
			setSelected([...selected, item])
			onChange(id, [...selected, item])
		}
	}

	return (
		<div className="px-4">
			<div>
				<label className="w-full block text-sm font-medium text-gray-700">
					{title}
				</label>
			</div>
			<fieldset className="space-y-5">
				<legend className="sr-only">{title}</legend>
				{options.map((option) => (
					<div className="relative flex items-start" key={option.value}>
						<div className="flex items-center h-5">
							<input
								id={option.value}
								aria-describedby="comments-description"
								name={option.value}
								value={option.value}
								onChange={(e) => {
									const val = e.target.value
									handleSelectedChange(val)
								}}
								checked={selected.includes(option.value)}
								type="checkbox"
								className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
							/>
						</div>
						<div className="ml-3 text-sm">
							<label
								htmlFor={option.value}
								className="font-medium text-gray-700">
								{option.label}
							</label>
						</div>
					</div>
				))}
			</fieldset>
		</div>
	)
}
