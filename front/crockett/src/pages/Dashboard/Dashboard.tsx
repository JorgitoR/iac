import * as logo from 'assets/logo.png'
// import the config file
import { AppConfig } from 'config'

export const Dashboard = () => {
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
						Welcome to {AppConfig.platformName} Dashboard
					</h2>
				</div>
			</div>
		</div>
	)
}
