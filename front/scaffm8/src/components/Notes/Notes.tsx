import { NotesForm } from './Form'
import { useState } from 'react'
import { VehiclesTable } from './Tables/Vehicles'
import { StaffTable } from './Tables/Staff'
import { AssetsTable } from './Tables/Assets'
import { ClientsTable } from './Tables/Clients'
import { JobsTable } from './Tables/Jobs'
import { TagTable } from './Tables'

interface NotesProps {
	type: 'vehicle' | 'staff' | 'assets' | 'client' | 'job' | 'tag'
	id: string | number
}

export const Notes = ({ type, id }: NotesProps) => {
	const [showNotesForm, setShowNotesForm] = useState(false)
	const [noteID, setNoteID] = useState('')
	const renderTableByType = () => {
		switch (type) {
			case 'vehicle':
				return (
					<VehiclesTable
						id={id}
						setShowNotesForm={setShowNotesForm}
						setNoteID={setNoteID}
					/>
				)
			case 'staff':
				return (
					<StaffTable
						id={id}
						setShowNotesForm={setShowNotesForm}
						setNoteID={setNoteID}
					/>
				)
			case 'assets':
				return (
					<AssetsTable
						id={id}
						setShowNotesForm={setShowNotesForm}
						setNoteID={setNoteID}
					/>
				)
			case 'client':
				return (
					<ClientsTable
						id={id}
						setShowNotesForm={setShowNotesForm}
						setNoteID={setNoteID}
					/>
				)
			case 'job':
				return (
					<JobsTable
						id={id}
						setShowNotesForm={setShowNotesForm}
						setNoteID={setNoteID}
					/>
				)
			case 'tag':
				return (
					<TagTable
						id={id}
						setShowNotesForm={setShowNotesForm}
						setNoteID={setNoteID}
					/>
				)
			default:
				return <></>
		}
	}

	return (
		<>
			<NotesForm
				heading="Create Notes / File "
				formType="create"
				open={showNotesForm}
				setOpen={setShowNotesForm}
				id={id}
				noteID={noteID}
				type={type}
			/>
			{renderTableByType()}
		</>
	)
}
