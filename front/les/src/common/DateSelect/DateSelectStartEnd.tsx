import moment from 'moment'
import DatePicker from 'react-datepicker'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'

interface Props {
	title: string
	startID: string
	endID: string
	startDate: string
	endDate: string
	onChange: (id: string, val: string) => void
	error?: string
}

export function DateSelectStartEnd({
	title,
	startID,
	endID,
	startDate,
	endDate,
	onChange,
	error,
}: Props) {
	const [changed, setChanged] = useState(false)
	return (
		<div className="w-full px-2 py-2">
			<label
				htmlFor={startID}
				id={`date${startID}`}
				className="block text-sm font-medium text-gray-700 mb-1">
				{title}
			</label>
			<DatePicker
				id={startID}
				dateFormat="dd/MM/yyyy"
				selected={
					endDate
						? moment(endDate, 'DD/MM/YYYY').toDate()
						: startDate
						? moment(startDate, 'DD/MM/YYYY').toDate()
						: null
				}
				shouldCloseOnSelect
				onChange={(date) => {
					if (date && date[0] && !changed) {
						onChange(startID, moment(date[0]).format('DD/MM/YYYY'))
					}
					if (date && changed) {
						onChange(endID, moment(date[0]).format('DD/MM/YYYY'))
					}
					setChanged(!changed)
				}}
				startDate={startDate ? moment(startDate, 'DD/MM/YYYY').toDate() : null}
				endDate={endDate ? moment(endDate, 'DD/MM/YYYY').toDate() : null}
				selectsRange
				allowSameDay
				selectsEnd
				className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-10 rounded-md shadow-sm pl-3"
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
