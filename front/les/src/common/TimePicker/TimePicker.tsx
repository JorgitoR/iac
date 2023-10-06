import moment from 'moment'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

interface TimeSelectProps {
	title: string
	id: string
	value: string | null
	onChange: (id: string, value: string) => void
	intervals?: number
	error?: string
}

export function TimeSelect({
	title,
	id,
	value,
	onChange,
	intervals = 15,
	error,
}: TimeSelectProps) {
	return (
		<div className="w-full px-2 py-2">
			<label
				htmlFor="datePicker"
				className="block text-sm font-medium text-gray-700 mb-1">
				{title}
			</label>
			<DatePicker
				selected={value ? moment(value, 'HH:mm').toDate() : null}
				onChange={(val) => onChange(id, moment(val).format('HH:mm'))}
				showTimeSelect
				showTimeSelectOnly
				timeIntervals={intervals}
				timeCaption="Time"
				dateFormat="HH:mm"
				className="block w-full border h-10 rounded-md shadow-sm pl-3"
			/>
			{error && (
				<p className="mt-2 text-sm text-red-600" id="email-error">
					{error}
				</p>
			)}
		</div>
	)
}
