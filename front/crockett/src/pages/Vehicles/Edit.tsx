import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VehiclesComponents } from 'components'

export const VehiclesEdit = () => {
	const [openVehiclesForm, setOpenVehiclesForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openVehiclesForm) {
			navigate(-1)
		}
	}, [openVehiclesForm])

	return (
		<VehiclesComponents.VehiclesForm
			formType="update"
			heading="Edit Vehicle"
			open={openVehiclesForm}
			setOpen={setOpenVehiclesForm}
			vehicle_id={Number(id)}
		/>
	)
}
