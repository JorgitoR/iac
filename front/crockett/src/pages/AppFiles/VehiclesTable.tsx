import { AppFilesServices } from 'services'
import { Table } from 'common'

interface IVehiclesFilesTableProps {
	id: string | number
}

export const VehiclesFilesTable = ({ id }: IVehiclesFilesTableProps) => {
	const { data, isLoading } = AppFilesServices.useAppFilesVehicles(id)

	const cols = [
		{
			header: 'Date Added',
			field: 'date_added',
		},
		{
			header: 'File Name',
			field: 'file_name',
		},
		{
			header: 'File Type',
			field: 'file_type',
		},
		{
			header: 'File',
			field: 'file',
		},
		{
			header: 'Uploaded By',
			field: 'uploaded_by',
		},
	]

	return (
		<>
			<Table
				columns={cols}
				data={data}
				isLoading={isLoading}
				title="App Files"
			/>
		</>
	)
}
