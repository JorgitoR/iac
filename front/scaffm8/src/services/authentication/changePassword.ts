import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

import { NotificationsContext } from 'context/notifications/toastContext'

export const useChangePassword = () => {
	const { showError } = useContext(NotificationsContext)

	const changePassword = async (newPassword: string) => {
		console.log(newPassword)
		try {
			// const response = await AuthRequest.requestNewPassword(newPassword)
			// console.log(response)
			// const { token, userName, email, userType } = response
			// dispatch(
			// 	createUser({
			// 		accessToken: token,
			// 		email,
			// 		name: userName,
			// 		userType,
			// 	})
			// )
			// showSuccess('Login successful')
			// navigator('/dashboard')
		} catch (error) {
			console.log(error)
			showError('Login failed email or password incorrect')
		}
	}

	return { changePassword }
}
