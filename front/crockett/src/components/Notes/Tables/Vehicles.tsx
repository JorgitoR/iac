import { Table } from 'common'
import columns from './Columns'
import { useNotesVehicles } from 'services/notes'

interface VechiclesTableProps {
	id: string | number
	setShowNotesForm: (open: boolean) => void
	setNoteID: (id: string) => void
}

export const VehiclesTable = ({
	id,
	setShowNotesForm,
	setNoteID,
}: VechiclesTableProps) => {
	const { data, isLoading } = useNotesVehicles(id)
	return (
		<div>
			<Table
				columns={columns({ setShowNotesForm, setNoteID })}
				data={data}
				isLoading={isLoading}
				title="Vehicles Notes & Files"
				setShowNotesForm={setShowNotesForm}
			/>
		</div>
	)
}
