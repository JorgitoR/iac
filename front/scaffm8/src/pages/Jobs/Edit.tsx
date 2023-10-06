import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JobsComponents } from 'components'

export const JobEdit = () => {
	const [openJobForm, setOpenJobForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openJobForm) {
			navigate(-1)
		}
	}, [openJobForm])

	return (
		<JobsComponents.JobForm
			formType="update"
			heading="Edit Job"
			open={openJobForm}
			setOpen={setOpenJobForm}
			job_id={Number(id)}
		/>
	)
}
