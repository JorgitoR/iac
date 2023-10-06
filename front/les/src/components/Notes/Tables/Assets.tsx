import { Table } from 'common'
import columns from './Columns'
import { useNotesAssets } from 'services/notes'

interface AssetsTableProps {
	id: string | number
	setShowNotesForm: (open: boolean) => void
	setNoteID: (id: string) => void
}

export const AssetsTable = ({
	id,
	setShowNotesForm,
	setNoteID,
}: AssetsTableProps) => {
	const { data, isLoading } = useNotesAssets(id)
	return (
		<div>
			<Table
				columns={columns({ setShowNotesForm, setNoteID })}
				data={data}
				isLoading={isLoading}
				title="Asset Notes & Files"
				setShowNotesForm={setShowNotesForm}
			/>
		</div>
	)
}
