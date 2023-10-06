import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser, resetUser } from 'redux/states/user'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'

interface LoginPayload {
	email: string
	password: string
}

interface LoginResonse {
	token: string
	userName: string
	email: string
	userType: string
}

export const useLogin = () => {
	const navigator = useNavigate()
	const dispatch = useDispatch()
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { postRequest } = useApi()

	useEffect(() => {
		dispatch(resetUser())
	}, [])

	const login = async (userEmail: string, userPasword: string) => {
		try {
			const payload: LoginPayload = {
				email: userEmail,
				password: userPasword,
			}
			const response = await postRequest(
				AppRoutes.serverAuthRoutes.login,
				payload
			)

			const { token, userName, email, userType } = response.data as LoginResonse
			dispatch(
				createUser({
					accessToken: token,
					email,
					name: userName,
					userType,
				})
			)
			showSuccess('Login successful')
			navigator(AppRoutes.privateRoutes.Dashboard)
		} catch (error) {
			showError((error as Error).message)
		}
	}

	return { login }
}
