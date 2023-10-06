import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientComponents } from 'components'

export const EditClientForm = () => {
	const [openClientForm, setOpenClientForm] = useState(true)
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		if (!openClientForm) {
			navigate(-1)
		}
	}, [openClientForm])

	return (
		<ClientComponents.EditClientsForm
			formType="update"
			heading="Edit Client"
			open={openClientForm}
			setOpen={setOpenClientForm}
			client_id={id}
		/>
	)
}
