import { AppRoutes } from 'config'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { AppStore } from 'redux/store'

interface Props {
	privateValidation: boolean
}

const PrivateValidationFragment = <Outlet />
const PublicValidationFragment = (
	<Navigate replace to={AppRoutes.privateRoutes.Dashboard} />
)

export const AuthGuard = ({ privateValidation }: Props) => {
	const userState = useSelector((store: AppStore) => store.user)
	return userState.name ? (
		privateValidation ? (
			PrivateValidationFragment
		) : (
			PublicValidationFragment
		)
	) : (
		<Navigate replace to={AppRoutes.publicRoutes.Login} />
	)
}

export default AuthGuard
