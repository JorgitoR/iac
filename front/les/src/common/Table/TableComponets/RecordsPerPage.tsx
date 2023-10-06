const SELECT_ROWS_SIZE = [10, 20, 30, 40, 50]

interface RecordsPerPageProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setPageSize: any
}

export function RecordsPerPage({ state, setPageSize }: RecordsPerPageProps) {
	return (
		<select
			className="mt-1 block h-10 rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			value={state.pageSize}
			onChange={(e) => {
				setPageSize(Number(e.target.value))
			}}>
			{SELECT_ROWS_SIZE.map((pageSize) => (
				<option key={pageSize} value={pageSize}>
					Show {pageSize}
				</option>
			))}
		</select>
	)
}
