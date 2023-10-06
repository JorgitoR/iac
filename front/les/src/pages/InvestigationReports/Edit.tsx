import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JobsComponents } from 'components'

export const InvestigationEdit = () => {
	const [openInvestigationForm, setOpenInvestigationForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openInvestigationForm) {
			navigate(-1)
		}
	}, [openInvestigationForm])

	return (
		<JobsComponents.JobForm
			formType="update"
			heading="Edit Job"
			open={openInvestigationForm}
			setOpen={setOpenInvestigationForm}
			job_id={Number(id)}
		/>
	)
}
