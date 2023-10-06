import { AppFilesServices } from 'services'
import { Table } from 'common'

export const MainFilesTable = () => {
	const { data, isLoading } = AppFilesServices.useAppFiles()

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
