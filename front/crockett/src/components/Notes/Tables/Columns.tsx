import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, ConfirmationDialog } from 'common'
import { useDeleteNote } from 'services/notes/deleteNote'

interface ColumnsProps {
	setShowNotesForm: (open: boolean) => void
	setNoteID: (id: string) => void
}

const Columns = ({ setShowNotesForm, setNoteID }: ColumnsProps) => {
	const { deleteNote } = useDeleteNote()

	return [
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
			field: 'fileUrl',
			body: (rowData: { fileUrl: string }) => (
				<a href={rowData.fileUrl}>Link</a>
			),
		},
		{
			field: 'id',
			header: 'Edit',
			body: (rowData: { id: string }) => (
				<Button
					type="button"
					variant="primary"
					onClick={() => {
						setShowNotesForm(true)
						setNoteID(rowData.id)
					}}
					size="sm">
					<PencilIcon className=" h-4 w-4" />
				</Button>
			),
		},
		{
			field: 'delete',
			header: 'delete',
			body: (row: { id: number }) => (
				<ConfirmationDialog
					icon="danger"
					title="Delete Task"
					body="Are you sure you want to delete this task? This action is unrecoverable!"
					triggerButton={
						<button type="button">
							<TrashIcon className="h-4 w-4 text-gray-500" />
						</button>
					}
					confirmButton={
						<Button
							size="sm"
							variant="danger"
							onClick={async () => deleteNote(row.id)}>
							Delete
						</Button>
					}
				/>
			),
		},
	]
}

export default Columns
