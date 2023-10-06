import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VisitsComponents } from 'components'

export const VisitsEdit = () => {
	const [openVisitsForm, setOpenVisitsForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openVisitsForm) {
			navigate(-1)
		}
	}, [openVisitsForm])

	return (
		<VisitsComponents.VisitForm
			formType="update"
			heading="Edit Visit"
			open={openVisitsForm}
			setOpen={setOpenVisitsForm}
			visit_id={Number(id)}
		/>
	)
}
