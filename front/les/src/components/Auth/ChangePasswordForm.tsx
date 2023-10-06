import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import * as logo from 'assets/logo.png'

interface ChangePasswordMainProps {
	formSubmit: (Newpassword: string) => void
}

export function ChangePasswordMain({ formSubmit }: ChangePasswordMainProps) {
	const validationSchema = Yup.object({
		password: Yup.string()
			.required('Password is required')
			.matches(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/,
				'Password must be at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
			),
		confirmPassword: Yup.string()
			.required('Password must match')
			.oneOf([Yup.ref('password')], 'Passwords must match'),
	})

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema,
		onSubmit: async ({ password }) => formSubmit(password),
	})

	return (
		<div className="min-h-screen flex justify-center px-4 py-32 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<img
						className="mx-auto h-24 w-auto"
						src={logo.default}
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Set your new password
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</div>
					</div>
					{formik.errors.password ? (
						<span className="text-sm text-red-500">
							{formik.errors.password}
						</span>
					) : null}
					<div>
						<label htmlFor="confirmPassword" className="sr-only">
							Repeat Password
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							autoComplete="current-password"
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Repeat Password"
							onChange={formik.handleChange}
							value={formik.values.confirmPassword}
						/>
					</div>
					{formik.errors.confirmPassword ? (
						<span className="text-sm text-red-500">
							{formik.errors.confirmPassword}
						</span>
					) : null}
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
							Change Password
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
