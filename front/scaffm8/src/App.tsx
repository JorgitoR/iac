import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppRoutes } from 'config'
import { AuthGuard } from 'guards' //RoleGuard

import {
	AuthPages,
	PageNotFound,
	DashboardPages,
	StaffPages,
	ClientPages,
	QuotesPages,
	VehiclePages,
	AssetsPages,
	JobsPages,
	InvoicesPages,
	VisitsPages,
	TimesheetsPages,
	JobSchedulerPages,
	JobStaffSchedulerPages,
	ScaffoldRegisterPages,
	AppFilesPages,
	LeavePages,
	InvestigationReportsPages,
} from 'pages'

import { Spinner } from 'common'
import { Navbar } from 'components/Navbar'

// const Dashboard = lazy(() => import('pages/Dashboard/Dashboard'))
const Login = lazy(() => import('pages/Auth/Login'))

function App() {
	const location = useLocation()
	const background = location?.state && location?.state?.background
	const backgroudName = location?.state && location?.state?.name

	return (
		<>
			<Navbar />
			<Suspense fallback={<Spinner />}>
				{/* Main Section of Routes */}
				<Routes location={background || location}>
					{/* Default Route Redirect to private main route to check is logged in  */}
					<Route
						path="/"
						element={<Navigate to={AppRoutes.privateRoutes.Dashboard} />}
					/>
					{/* route for 404 page not found  */}
					<Route
						path={AppRoutes.publicRoutes.PageNotFound}
						element={<PageNotFound.PageNotFoundMain />}
					/>
					{/* Login Page  */}
					<Route path={AppRoutes.publicRoutes.Login} element={<Login />} />
					{/* Set Password Page  */}
					<Route
						path={AppRoutes.publicRoutes.SetPasswordReset}
						element={<AuthPages.ResetPasswordMain />}
					/>
					{/* Forgot my Password Page  */}
					<Route
						path={AppRoutes.publicRoutes.ForgotPassword}
						element={<AuthPages.ForgotPasswordMain />}
					/>
					{/* Private Routes  */}
					<Route element={<AuthGuard privateValidation />}>
						{/* Dashboard  */}
						<Route
							path={AppRoutes.privateRoutes.Dashboard}
							element={<DashboardPages.Dashboard />}
						/>
						{/* Staff  */}
						<Route
							path={AppRoutes.privateRoutes.Staff}
							element={<StaffPages.StaffMainTable />}
						/>
						{/* Staff Details */}
						<Route
							path={AppRoutes.privateRoutes.StaffDetail}
							element={<StaffPages.DetailsPage />}
						/>
						{/* Staff Competencies*/}
						<Route
							path={AppRoutes.privateRoutes.StaffCompetencies}
							element={<StaffPages.CompetenciesMain />}
						/>
						{/* Clients */}
						<Route
							path={AppRoutes.privateRoutes.Clients}
							element={<ClientPages.ClientsMainTable />}
						/>
						{/* Clients */}
						<Route
							path={AppRoutes.privateRoutes.ClientsDetail}
							element={<ClientPages.DetailsPage />}
						/>
						{/* Quotes */}
						<Route
							path={AppRoutes.privateRoutes.Quotes}
							element={<QuotesPages.QuotesMainTable />}
						/>
						{/* Quotes Create */}
						<Route
							path={AppRoutes.privateRoutes.QuotesCreate}
							element={<QuotesPages.QuotesFormPage />}
						/>
						{/* Quotes Edit */}
						<Route
							path={AppRoutes.privateRoutes.QuotesEdit}
							element={<QuotesPages.QuotesFormPage />}
						/>
						{/* Quotes Detail */}
						<Route
							path={AppRoutes.privateRoutes.QuotesDetail}
							element={<QuotesPages.QuoteDetails />}
						/>
						{/* Quotes PDF Output */}
						<Route
							path={AppRoutes.privateRoutes.QuotesPDF}
							element={<QuotesPages.QuotePdfPage />}
						/>
						{/* Vehicles Main Page */}
						<Route
							path={AppRoutes.privateRoutes.Vehicles}
							element={<VehiclePages.VehiclesMainTable />}
						/>
						{/* Vehicles Details Page */}
						<Route
							path={AppRoutes.privateRoutes.VehiclesDetail}
							element={<VehiclePages.DetailsPage />}
						/>
						{/* Assets Main Page */}
						<Route
							path={AppRoutes.privateRoutes.Assets}
							element={<AssetsPages.AssetsMainTable />}
						/>
						{/* Assets Details Page */}
						<Route
							path={AppRoutes.privateRoutes.AssetsDetail}
							element={<AssetsPages.DetailsPage />}
						/>
						{/* Jobs Main Page */}
						<Route
							path={AppRoutes.privateRoutes.Jobs}
							element={<JobsPages.JobsMainTable />}
						/>
						{/* Jobs Details Page */}
						<Route
							path={AppRoutes.privateRoutes.JobsDetail}
							element={<JobsPages.JobDetails />}
						/>
						{/* Jobs Scheduler Page*/}
						<Route
							path={AppRoutes.privateRoutes.JobScheduler}
							element={<JobSchedulerPages.SchedulerMain />}
						/>
						{/* Jobs Staff Scheduler Page*/}
						<Route
							path={AppRoutes.privateRoutes.JobStaffScheduler}
							element={<JobStaffSchedulerPages.StaffSchedulerMain />}
						/>
						{/* Visits Main Page */}
						<Route
							path={AppRoutes.privateRoutes.visits}
							element={<VisitsPages.VisitsMainTable />}
						/>
						{/* Invoices Main Page */}
						<Route
							path={AppRoutes.privateRoutes.Invoices}
							element={<InvoicesPages.MainInvoicesTable />}
						/>
						{/* Invoices Approved Page */}
						<Route
							path={AppRoutes.privateRoutes.InvoicesApproved}
							element={<InvoicesPages.ApprovedInvoicesTable />}
						/>
						{/* Timesheets Page */}
						<Route
							path={AppRoutes.privateRoutes.timesheets}
							element={<TimesheetsPages.TimesheetsMainTable />}
						/>
						{/* Timesheets Approved Page */}
						<Route
							path={AppRoutes.privateRoutes.timesheetsApproved}
							element={<TimesheetsPages.ApprovedTimesheetsMainTable />}
						/>
						{/* Scaffold  Register Main Page */}
						<Route
							path={AppRoutes.privateRoutes.scaffoldRegister}
							element={<ScaffoldRegisterPages.ScaffoldRegisterMainTable />}
						/>
						{/* Scaffold  Register Details Page */}
						<Route
							path={AppRoutes.privateRoutes.scaffoldRegisterDetail}
							element={<ScaffoldRegisterPages.DetailsPage />}
						/>
						{/* App Files */}
						<Route
							path={AppRoutes.privateRoutes.AppFiles}
							element={<AppFilesPages.MainFilesTable />}
						/>
						{/* Leave  */}
						<Route
							path={AppRoutes.privateRoutes.leave}
							element={<LeavePages.LeaveMainTable />}
						/>
						{/* Leave Approved  */}
						<Route
							path={AppRoutes.privateRoutes.LeaveApproved}
							element={<LeavePages.ApprovedLeaveTable />}
						/>
						{/* Investigation Reports  */}
						<Route
							path={AppRoutes.privateRoutes.InvestigationReports}
							element={<InvestigationReportsPages.InvestigationReportsTable />}
						/>
					</Route>
					{/* Setup Server Route  */}
					<Route
						path={AppRoutes.serverSetUpRoute}
						element={<AuthPages.SetUpServerMain />}
					/>
				</Routes>
				{/* Routes for Edit Modals */}
				<Routes location={location}>
					{background && backgroudName ? renderEditModals(backgroudName) : null}
					<Route path="*" element={null} />
				</Routes>
			</Suspense>
		</>
	)
}

const renderEditModals = (backgroudName: string) => {
	switch (backgroudName) {
		case 'editStaff':
			return (
				<Route
					path={AppRoutes.privateRoutes.StaffEdit}
					element={<StaffPages.StaffEdit />}
				/>
			)
		case 'editJob':
			return (
				<Route
					path={AppRoutes.privateRoutes.JobsEdit}
					element={<JobsPages.JobEdit />}
				/>
			)
		case 'editTask':
			return (
				<Route
					path={AppRoutes.privateRoutes.tasksEdit}
					element={<JobsPages.TaskEdit />}
				/>
			)
		case 'editContact':
			return (
				<Route
					path={AppRoutes.privateRoutes.ClientContactEdit}
					element={<ClientPages.EditContactForm />}
				/>
			)
		case 'editClient':
			return (
				<Route
					path={AppRoutes.privateRoutes.ClientsEdit}
					element={<ClientPages.EditClientForm />}
				/>
			)
		case 'editAsset':
			return (
				<Route
					path={AppRoutes.privateRoutes.AssetsEdit}
					element={<AssetsPages.AssetsEdit />}
				/>
			)
		case 'editVehicle':
			return (
				<Route
					path={AppRoutes.privateRoutes.VehiclesEdit}
					element={<VehiclePages.VehiclesEdit />}
				/>
			)
		case 'editVisit':
			return (
				<Route
					path={AppRoutes.privateRoutes.visitsEdit}
					element={<VisitsPages.VisitsEdit />}
				/>
			)
		case 'editInvoice':
			return (
				<Route
					path={AppRoutes.privateRoutes.editInvoice}
					element={<InvoicesPages.InvoicesEdit />}
				/>
			)
		case 'editScaffoldRegister':
			return (
				<Route
					path={AppRoutes.privateRoutes.scaffoldRegisterEdit}
					element={<ScaffoldRegisterPages.SaffoldRegisterEdit />}
				/>
			)
		case 'editLeave':
			return (
				<Route
					path={AppRoutes.privateRoutes.leaveEdit}
					element={<LeavePages.LeaveEdit />}
				/>
			)
	}
}

export default App
