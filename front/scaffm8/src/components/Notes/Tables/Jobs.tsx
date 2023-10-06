import { Table } from 'common'
import columns from './Columns'
import { useNotesJobs } from 'services/notes'

interface JobsTableProps {
	id: string | number
	setShowNotesForm: (open: boolean) => void
	setNoteID: (id: string) => void
}

export const JobsTable = ({
	id,
	setShowNotesForm,
	setNoteID,
}: JobsTableProps) => {
	const { data, isLoading } = useNotesJobs(id)

	return (
		<div>
			<Table
				columns={columns({ setShowNotesForm, setNoteID })}
				data={data}
				isLoading={isLoading}
				title="Job Notes & Files"
				setShowNotesForm={setShowNotesForm}
			/>
		</div>
	)
}
