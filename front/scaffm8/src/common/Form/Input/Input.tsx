import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { classNames } from 'utilities'

interface Props {
	title: string
	type: string
	id: string
	placeholder: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
	value: string | number
	defaultValue?: string
	error?: string
	labelInline?: boolean
	icon?: string
	disabled?: boolean
}

export const Input = ({
	title,
	// type,
	id,
	placeholder,
	handleChange,
	handleBlur,
	value,
	defaultValue,
	error,
	disabled,
}: Props) => (
	<div className={classNames('block px-2 py-2', 'w-full')}>
		<div>
			<label
				htmlFor={id}
				className={classNames('', 'block text-sm font-medium text-gray-700')}>
				{title}
			</label>
		</div>
		<div
			className={classNames(
				'relative mt-1 rounded-md shadow-sm sm:col-span-2'
			)}>
			<input
				type="text"
				name={id}
				id={id}
				className={classNames(
					error
						? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
						: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
					'block w-full border h-10 rounded-md shadow-sm pl-3'
				)}
				placeholder={placeholder}
				aria-invalid="true"
				aria-describedby="email-error"
				onChange={handleChange}
				onBlur={handleBlur}
				value={value}
				defaultValue={defaultValue}
				disabled={disabled}
			/>
			{error && (
				<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<ExclamationCircleIcon
						className="w-5 h-5 text-red-500"
						aria-hidden="true"
					/>
				</div>
			)}
		</div>
		{error && (
			<p className="mt-2 text-sm text-red-600" id="email-error">
				{error}
			</p>
		)}
	</div>
)
