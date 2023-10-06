import React, { FC } from 'react'
import Select from 'react-select'
import clsx from 'clsx'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

type Option = {
	value: string
	label: string
}

type Props = {
	label: string
	id: string
	hasLabel?: boolean
	repeatingForm?: boolean
	isMultiSelect?: boolean
	isLoading?: boolean
	options: Option[]
	value: string | number
	onChange: (id: string, val: string) => void
	onBlur?: (id: string, isBlur: boolean) => void
	onChangeVal?: string
	defaultValue?: string
	error?: string
	disabled?: boolean
}

const customStyles = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: (provided: any, state: any) => ({
		...provided,
		minHeight: '40px',
		height: '40px',
		boxShadow: state.isFocused ? null : null,
	}),

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	valueContainer: (provided: any) => ({
		...provided,
		height: '30px',
		padding: '0 6px',
	}),

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	input: (provided: any) => ({
		...provided,
		margin: '0px',
	}),

	indicatorSeparator: () => ({
		display: 'none',
	}),

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	indicatorsContainer: (provided: any) => ({
		...provided,
		height: '30px',
	}),
}

export const Dropdown: FC<Props> = ({
	label,
	id,
	hasLabel = true,
	isMultiSelect,
	isLoading,
	options,
	value,
	onChange,
	onBlur,
	error,
	disabled = false,
}) => {
	const handleChange = (val: unknown) => onChange(id, (val as Option).value)

	return (
		<>
			{hasLabel ? (
				<div className={clsx('w-full px-2 py-2 h-full')}>
					<label
						id={id}
						htmlFor={id}
						className="block mb-1 text-sm font-medium text-gray-700">
						{label}
					</label>
					<Select
						id={id}
						isMulti={isMultiSelect}
						isLoading={isLoading}
						isDisabled={isLoading || disabled}
						options={options}
						onBlur={() => (onBlur ? onBlur(id, true) : null)}
						onChange={handleChange}
						value={options.filter((option) => option.value === value)}
						className="text-xs shadow-sm"
						styles={customStyles}
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
			) : (
				<Select
					id={id}
					isMulti={isMultiSelect}
					isLoading={isLoading}
					isDisabled={isLoading || disabled}
					options={options}
					onBlur={() => (onBlur ? onBlur(id, true) : null)}
					onChange={handleChange}
					value={options.filter((option) => option.label === value)}
					className="text-xs"
					styles={customStyles}
				/>
			)}
		</>
	)
}
