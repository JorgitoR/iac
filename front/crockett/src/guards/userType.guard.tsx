import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { AppRoutes } from 'config'

import { Roles } from 'models'
import { AppStore } from 'redux/store'

interface Props {
	rol: Roles
}

const PrivateRoutes = AppRoutes.privateRoutes

function RoleGuard({ rol }: Props) {
	const userState = useSelector((store: AppStore) => store.user)
	return userState.userType === rol ? (
		<Outlet />
	) : (
		<Navigate replace to={PrivateRoutes.Dashboard} />
	)
}
export default RoleGuard
