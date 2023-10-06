import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AssetsComponents } from 'components'

export const LeaveEdit = () => {
	const [openAssetsForm, setOpenAssetsForm] = useState(true)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (!openAssetsForm) {
			navigate(-1)
		}
	}, [openAssetsForm])

	return (
		<AssetsComponents.AssetsForm
			formType="update"
			heading="Edit Asset"
			open={openAssetsForm}
			setOpen={setOpenAssetsForm}
			asset_id={Number(id)}
		/>
	)
}
