import { Badge, Table } from 'common'
import { ScaffolRegisterServices } from 'services'
import { dateFormat } from 'utilities'

interface ScaffoldRegisterTableProps {
	job_id?: number
}

export const ScaffoldRegisterTable = ({
	job_id,
}: ScaffoldRegisterTableProps) => {
	const { data, isLoading } = ScaffolRegisterServices.useGetTagByJobId(job_id)
	const columns = [
		{ field: 'tag_no', header: 'Tag #' },
		{ field: 'description', header: 'Description' },
		{
			field: '',
			header: 'Last Inspection',
			body: (rowData: { last_inspection_date: Date }) => {
				return rowData.last_inspection_date
					? dateFormat.format(rowData.last_inspection_date)
					: ''
			},
		},
		{
			field: '',
			header: 'Inspection Due',
			body: (rowData: { inspection_due_date: Date }) => {
				return rowData.inspection_due_date
					? dateFormat.format(rowData.inspection_due_date)
					: ''
			},
		},
		{
			field: '',
			header: 'Status',
			body: (rowData: { status: string }) => {
				return <Badge text={rowData.status} type={rowData.status} />
			},
		},
	]
	console.log(data)
	return (
		<>
			<Table
				columns={columns}
				data={data}
				isLoading={isLoading ?? false}
				title="Scaffold Register"
				disableButtons
			/>
		</>
	)
}
