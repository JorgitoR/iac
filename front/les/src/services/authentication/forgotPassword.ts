import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetUser } from 'redux/states/user'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'

interface ForgotPasswordPayload {
	email: string
}

export const useForgotPassword = () => {
	const navigator = useNavigate()
	const dispatch = useDispatch()
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()

	useEffect(() => {
		dispatch(resetUser())
	}, [])

	const sendEmail = async (userEmail: string) => {
		try {
			const payload: ForgotPasswordPayload = {
				email: userEmail,
			}
			await postRequest(
				AppRoutes.serverAuthRoutes.requestResetPassword,
				payload
			)
			showSuccess('Email Sended')
			navigator('/dashboard')
		} catch (error) {
			if ((error as Error).message === 'User not found') {
				showError((error as Error).message)
			} else {
				showError('Error sending the email. Please try later')
			}
		}
	}

	return { sendEmail }
}
