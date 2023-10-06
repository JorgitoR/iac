import { AuthComponents } from 'components'
import { AuthServices } from 'services'

export function ResetPasswordMain() {
	const { changePassword } = AuthServices.useResetPassword()

	return <AuthComponents.ChangePasswordMain formSubmit={changePassword} />
}
