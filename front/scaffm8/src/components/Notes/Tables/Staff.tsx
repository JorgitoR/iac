import { Table } from 'common'
import columns from './Columns'
import { useNotesStaff } from 'services/notes'

interface StaffTableProps {
	id: string | number
	setShowNotesForm: (open: boolean) => void
	setNoteID: (id: string) => void
}

export const StaffTable = ({
	id,
	setShowNotesForm,
	setNoteID,
}: StaffTableProps) => {
	const { data, isLoading } = useNotesStaff(id)
	return (
		<div>
			<Table
				columns={columns({ setShowNotesForm, setNoteID })}
				data={data}
				isLoading={isLoading}
				title="Staff Notes & Files"
				setShowNotesForm={setShowNotesForm}
			/>
		</div>
	)
}
