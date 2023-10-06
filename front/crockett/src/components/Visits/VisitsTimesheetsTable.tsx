import { Table } from 'common'

export const VisitsTimesheetsTable = () => {
	const columns = [
		{ field: '', header: 'Date' },
		{ field: '', header: 'Time In' },
		{ field: '', header: 'Time Off' },
		{ field: '', header: '#Staff' },
		{ field: '', header: 'Total Hours' },
	]

	return (
		<>
			<Table
				columns={columns}
				data={[]}
				isLoading={false}
				title="Visits Timesheets"
				disableButtons
			/>
		</>
	)
}
