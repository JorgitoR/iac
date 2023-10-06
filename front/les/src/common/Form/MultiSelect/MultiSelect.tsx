import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import Select from 'react-select'

type Option = {
	value: string
	label: string
}

interface Props {
	id: string
	label: string
	options: Option[]
	value?: string[] | number[]
	onChange: (id: string, val: string[]) => void
	error?: string | string[]
	isDisabled?: boolean
}

export const MultiSelect = ({
	id,
	label,
	options,
	value,
	error,
	onChange,
}: Props) => {
	return (
		<div className="w-full px-2 py-2">
			<label
				id={`label${id}`}
				htmlFor={id}
				className="block mb-1 text-sm font-medium text-gray-700">
				{label}
			</label>
			<Select
				isMulti
				name={id}
				id={id}
				options={options}
				onChange={(value) => {
					const newValues: Option[] = value as unknown as []
					const values = newValues.map((item) => String(item.value))
					onChange(id, values)
				}}
				value={value?.map((item) => {
					const option = options.find(
						(option) => String(option.value) === String(item)
					)

					return {
						value: option?.value,
						label: option?.label,
					}
				})}
				className="w-full h-10 basic-multi-select"
				classNamePrefix="select"
			/>
			{error && (
				<div className="flex items-center">
					<ExclamationCircleIcon
						className="w-5 h-5 text-red-500"
						aria-hidden="true"
					/>
					<p className="mt-2 text-sm text-red-600" id="email-error">
						{error}
					</p>
				</div>
			)}
		</div>
	)
}
