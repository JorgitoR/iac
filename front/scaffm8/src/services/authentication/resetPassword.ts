import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetUser } from 'redux/states/user'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'

export const useResetPassword = () => {
	const { token } = useParams()
	const navigator = useNavigate()
	const dispatch = useDispatch()
	const { showSuccess, showInfo, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()

	useEffect(() => {
		dispatch(resetUser())
		if (!token) {
			return navigator('/', { replace: true })
		}
		postRequest(AppRoutes.serverAuthRoutes.resetPasswordVerifyToken, { token })
			.then(() => {
				showInfo('Change your password')
			})
			.catch(() => {
				navigator('/', { replace: true })
				showError('Error The link has expired')
			})
	}, [token])

	const changePassword = async (newPassword: string) => {
		try {
			await postRequest(`${AppRoutes.serverAuthRoutes.resetPassword}`, {
				password: newPassword,
				token,
			})
			showSuccess('Password changed, please login')
			navigator('/', { replace: true })
		} catch (error) {
			showError('Something went wrong')
		}
	}

	return { changePassword }
}
