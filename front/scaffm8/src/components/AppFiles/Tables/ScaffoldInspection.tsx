import { Table } from 'common'
import { columns } from './Columns'
import { useAppFilesTags } from 'services/appfiles'

interface ScaffoldTableProps {
	id: string | number
}

export const ScaffoldInspectionTable = ({ id }: ScaffoldTableProps) => {
	const { data, isLoading } = useAppFilesTags(id)
	return (
		<div>
			<Table
				columns={columns}
				data={data}
				isLoading={isLoading}
				title="Scaffold Inspection Files"
			/>
		</div>
	)
}
