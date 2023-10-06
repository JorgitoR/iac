import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JobsComponents } from 'components'

export const TaskEdit = () => {
	const [openTaskForm, setOpenTaskForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openTaskForm) {
			navigate(-1)
		}
	}, [openTaskForm])

	return (
		<JobsComponents.EditTaskForm
			formType="update"
			heading="Edit Task"
			open={openTaskForm}
			setOpen={setOpenTaskForm}
			task_id={Number(id)}
		/>
	)
}
