export const columns = [
	{
		header: 'Created Date',
		field: 'createdDate',
	},
	{
		header: 'File Type',
		field: 'fileType',
	},
	{
		header: 'File Description',
		field: 'fileDescription',
	},
	{
		header: 'Notes',
		field: 'notes',
	},
	{
		header: 'File',
		field: 'file',
		body: (rowData: { file: string }) => <a href={rowData.file}>Link</a>,
	},
]
