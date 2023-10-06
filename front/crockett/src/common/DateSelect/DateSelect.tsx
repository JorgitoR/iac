import moment from 'moment'
import DatePicker from 'react-datepicker'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

import 'react-datepicker/dist/react-datepicker.css'

interface Props {
	title: string
	id: string
	value: string | null
	onChange: (id: string, val: string) => void
	error?: string
}

export function DateSelect({ title, id, value, onChange, error }: Props) {
	return (
		<div className="w-full px-2 py-2">
			<label
				htmlFor={id}
				id={`date${id}`}
				className="block text-sm font-medium text-gray-700 mb-1">
				{title}
			</label>
			<DatePicker
				id={id}
				autoComplete="off"
				dateFormat="dd/MM/yyyy"
				selected={value ? moment(value, 'DD/MM/YYYY').toDate() : null}
				onChange={(val: Date) => {
					if (!val) return onChange(id, '')
					const value: string = moment(val).format('DD/MM/YYYY').toString()
					onChange(id, value)
				}}
				className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-10 rounded-md shadow-sm pl-2"
			/>
			{error && (
				<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<ExclamationCircleIcon
						className="w-5 h-5 text-red-500"
						aria-hidden="true"
					/>
				</div>
			)}
			{error && (
				<p className="mt-2 text-sm text-red-600" id="email-error">
					{error}
				</p>
			)}
		</div>
	)
}
