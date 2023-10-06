import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ScaffoldRegisterComponents } from 'components'

export const SaffoldRegisterEdit = () => {
	const [openScaffoldRegisterForm, setOpenScaffoldRegisterForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openScaffoldRegisterForm) {
			navigate(-1)
		}
	}, [openScaffoldRegisterForm])

	return (
		<ScaffoldRegisterComponents.ScaffoldRegisterFrom
			formType="update"
			heading="Edit Scaffold Register"
			open={openScaffoldRegisterForm}
			setOpen={setOpenScaffoldRegisterForm}
			tag_id={Number(id)}
		/>
	)
}
