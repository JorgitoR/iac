import { Table } from 'common'
import { columns } from './Columns'
import { useAppFilesTags } from 'services/appfiles'

interface VechiclesTableProps {
	id: string | number
}

export const VehiclesTable = ({ id }: VechiclesTableProps) => {
	const { data, isLoading } = useAppFilesTags(id)
	return (
		<div>
			<Table
				columns={columns}
				data={data}
				isLoading={isLoading}
				title="Vehicles Files"
			/>
		</div>
	)
}
