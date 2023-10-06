import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ContacsForm } from 'components/Contacts/ContactForm'

export const EditContactForm = () => {
	const [openContactForm, setOpenContactForm] = useState(true)
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		if (!openContactForm) {
			navigate(-1)
		}
	}, [openContactForm])

	return (
		<ContacsForm
			formType="update"
			heading="Edit Contact"
			open={openContactForm}
			setOpen={setOpenContactForm}
			contact_id={Number(id)}
		/>
	)
}
