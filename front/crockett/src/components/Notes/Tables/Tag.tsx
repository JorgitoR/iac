import { Table } from 'common'
import columns from './Columns'
import { useNotesTag } from 'services/notes'

interface TagTableProps {
	id: string | number
	setShowNotesForm: (open: boolean) => void
	setNoteID: (id: string) => void
}

export const TagTable = ({
	id,
	setShowNotesForm,
	setNoteID,
}: TagTableProps) => {
	const { data, isLoading } = useNotesTag(id)
	return (
		<div>
			<Table
				columns={columns({ setShowNotesForm, setNoteID })}
				data={data}
				isLoading={isLoading}
				title="Tag Notes & Files"
				setShowNotesForm={setShowNotesForm}
			/>
		</div>
	)
}
