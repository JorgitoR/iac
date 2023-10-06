import { useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import * as logo from 'assets/logo.png'
import { AuthServices } from 'services'
import { AppRoutes } from 'config'

export function LoginMain() {
	const navigator = useNavigate()
	const { login } = AuthServices.useLogin()

	const validationSchema = Yup.object({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string().required('Password is required'),
	})

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema,
		onSubmit: async ({ email, password }) => {
			login(email, password)
		},
	})

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<img
						className="mx-auto h-24 w-auto"
						src={logo.default}
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</div>
						{formik.errors.email ? (
							<span className="text-sm text-red-500">
								{formik.errors.email}
							</span>
						) : null}
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</div>
						{formik.errors.password ? (
							<span className="text-sm text-red-500">
								{formik.errors.password}
							</span>
						) : null}
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<LockClosedIcon
									className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
									aria-hidden="true"
								/>
							</span>
							Sign in
						</button>
					</div>
				</form>
				<div>
					<button
						type="button"
						onClick={() => navigator(AppRoutes.publicRoutes.ForgotPassword)}
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						<span className="absolute left-0 inset-y-0 flex items-center pl-3">
							<LockClosedIcon
								className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
								aria-hidden="true"
							/>
						</span>
						Forgot my password
					</button>
				</div>
			</div>
		</div>
	)
}

export default LoginMain
