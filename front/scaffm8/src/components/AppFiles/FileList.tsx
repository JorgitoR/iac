import { ScaffoldInspectionTable } from './Tables/ScaffoldInspection'
import { VehiclesTable } from './Tables/Vehicles'

interface FileListProps {
	type: 'vehicles' | 'scaffoldInspection'
	id: string | number
}

export const FileList = ({ type, id }: FileListProps) => {
	if (type === 'vehicles') {
		return <VehiclesTable id={id} />
	}
	if (type === 'scaffoldInspection') {
		return <ScaffoldInspectionTable id={id} />
	}
	return <></>
}
