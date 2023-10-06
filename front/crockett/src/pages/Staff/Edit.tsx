import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StaffComponents } from 'components'

export const StaffEdit = () => {
	const [openStaffForm, setOpenStaffForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openStaffForm) {
			navigate(-1)
		}
	}, [openStaffForm])

	return (
		<StaffComponents.StaffForm
			formType="update"
			heading="Edit Staff"
			open={openStaffForm}
			setOpen={setOpenStaffForm}
			staff_id={id}
		/>
	)
}
