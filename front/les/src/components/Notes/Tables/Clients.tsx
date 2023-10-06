import { Table } from 'common'
import columns from './Columns'
import { useNotesClients } from 'services/notes'

interface ClientsTableProps {
	id: string | number
	setShowNotesForm: (open: boolean) => void
	setNoteID: (id: string) => void
}

export const ClientsTable = ({
	id,
	setShowNotesForm,
	setNoteID,
}: ClientsTableProps) => {
	const { data, isLoading } = useNotesClients(id)
	return (
		<div>
			<Table
				columns={columns({ setShowNotesForm, setNoteID })}
				data={data}
				isLoading={isLoading}
				title="Client Notes & Files"
				setShowNotesForm={setShowNotesForm}
			/>
		</div>
	)
}
