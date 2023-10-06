import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { classNames } from 'utilities'

interface TextAreaProps {
	title?: string
	type?: string
	id: string
	placeholder?: string
	labelInline?: boolean
	handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
	handleBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
	value?: string
	error?: string
	rows?: number
	disabled?: boolean
}

export function TextArea({
	title,
	//type,
	id,
	placeholder,
	labelInline = false,
	handleChange,
	handleBlur,
	value,
	error,
	rows,
	disabled,
}: TextAreaProps) {
	return (
		<div
			className={classNames(
				labelInline
					? 'space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'
					: 'block',
				'w-full px-2 py-4 '
			)}>
			<div>
				<label htmlFor={id} className="block text-sm font-medium text-gray-700">
					{title}
				</label>
			</div>
			<div className="sm:col-span-2">
				<textarea
					name={id}
					id={id}
					rows={rows}
					className={classNames(
						error
							? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
							: 'focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-700',
						'block w-full py-2 text-md rounded-md sm:text-sm border pl-2 shadow-sm'
					)}
					placeholder={placeholder}
					aria-invalid="true"
					aria-describedby="email-error"
					onChange={handleChange}
					onBlur={handleBlur}
					value={value || ''}
					disabled={disabled}
				/>
				{error && (
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
						<ExclamationCircleIcon
							className="h-5 w-5 text-red-500"
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
}
