export const publicRoutes = {
	Login: '/login',
	SetPasswordReset: '/changePassword/:token',
	SetPassword: '/setPassword',
	ForgotPassword: '/forgot-password',
	PageNotFound: '*',
}

export const privateRoutes = {
	Dashboard: '/dashboard',
	AppFiles: '/appFiles',
	Staff: '/staff',
	StaffDetail: '/staff/:id/details',
	StaffEdit: '/staff/:id/edit',
	StaffCompetencies: '/staffCompetencies',
	Clients: '/clients',
	ClientsEdit: '/clients/:id/edit',
	ClientsDetail: '/clients/:id/details',
	ClientContactEdit: '/contact/:id/edit',
	Quotes: '/quotes',
	QuotesCreate: '/quotes/create',
	QuotesEdit: '/quotes/:id/edit',
	QuotesDetail: '/quotes/:id/details',
	QuotesPDF: '/quotes/:id/output',
	Vehicles: '/vehicles',
	VehiclesEdit: '/vehicles/:id/edit',
	VehiclesDetail: '/vehicles/:id/details',
	Assets: '/assets',
	AssetsEdit: '/assets/:id/edit',
	AssetsDetail: '/assets/:id/details',
	Jobs: '/jobs',
	JobsEdit: '/jobs/:id/edit',
	JobsDetail: '/jobs/:id/details',
	JobScheduler: '/jobScheduler',
	JobStaffScheduler: '/staffScheduler',
	tasksEdit: '/jobs/tasks/:id/edit',
	variationTasksEdit: '/jobs/variationTasks/:id/edit',
	Invoices: '/invoices',
	InvoicesApproved: '/ApprovedInvoices',
	editInvoice: '/invoices/:invoiceType/:id/edit',
	visits: '/visits',
	visitsEdit: '/visits/:id/edit',
	timesheets: '/timesheets',
	timesheetsApproved: '/ApprovedTimesheets',
	timesheetsEdit: '/timesheets/:id/edit',
	scaffoldRegister: '/scaffoldRegister',
	scaffoldRegisterEdit: '/scaffoldRegister/:id/edit',
	scaffoldRegisterDetail: '/scaffoldRegister/:id/details',
	leave: '/leave',
	leaveEdit: '/leave/:id/edit',
	LeaveApproved: '/ApprovedLeave',
	InvestigationReports: '/investigationReports',
}

export const serverAppFilesRoutes = {
	getAllAppFiles: 'app-files',
	getAppFile: 'app-files/:id',
	createAppFile: 'app-files',
	updateAppFile: 'app-files/:id',
	getAllAppFilesVehicles: 'app-files/vehicles/:id',
	getAppFilesJobs: 'app-files/jobs/:id',
	getAppFilesStaff: 'app-files/staff/:id',
	getAppFilesScaffoldRegister: 'app-files/scaffoldRegister/:id',
	getAppFilesClients: 'app-files/clients/:id',
}

export const serverNotesAndFilesRoutes = {
	getAllNotesAndFiles: 'notes',
	getNotesAndFiles: 'notes/:id',
	createNotesAndFiles: 'notes',
	updateNotesAndFiles: 'notes/:id',
	getAllNotesAndFilesByVehicleId: 'notes/vehicle/:id',
	getAllNotesAndFilesByJobId: 'notes/job/:id',
	getAllNotesAndFilesByStaffId: 'notes/staff/:id',
	getAllNotesAndFilesByAssetsId: 'notes/assets/:id',
	getAllNotesAndFilesByClientsId: 'notes/client/:id',
	getAllNotesAndFilesByScaffoldRegisterId: 'notes/scaffoldRegister/:id',
}

export const serverAuthRoutes = {
	checkEnableConfig: 'enableConfig',
	setUpServer: 'setupServer',
	login: 'auth/login',
	logout: 'auth/logout',
	resetPasswordVerifyToken: 'auth/check-token-reset-password',
	resetPassword: 'auth/reset-password',
	requestResetPassword: 'auth/request-password-reset',
}

export const serverIncidentReportsRoutes = {
	getAllIncidentReports: 'investigation-report',
	getIncidentReports: 'investigation-report/:id',
	createIncidentReports: 'investigation-report',
	updateIncidentReports: 'investigation-report/:id',
}

export const serverStaffRoutes = {
	getAllStaff: 'staff',
	getStaff: 'staff/:id',
	createStaff: 'staff',
	updateStaff: 'staff/:id',
}

export const serverJobsRoutes = {
	getAllJobs: 'jobs',
	getJob: 'jobs/:id',
	createJob: 'jobs',
	updateJob: 'jobs/:id',
	getJobTasks: 'jobs/:id/tasks',
	getTask: 'jobs/job/tasks/:id',
	getAllTask: 'jobs/all/tasks/all',
	createVariationTask: 'jobs/:id/tasks/variation',
	deleteTask: 'jobs/job/tasks/:id',
	updateTask: 'jobs/job/tasks/:id',
	getHandoverByJobId: 'jobs/:id/handover',
	updateHandover: 'jobs/job/handover/:id',
}

export const serverScaffoldRegisterRoutes = {
	getAllScaffoldRegister: 'scaffoldRegister',
	getAllScaffoldRegisterByJobId: 'scaffoldRegister/job/:id',
	getScaffoldRegister: 'scaffoldRegister/:id',
	createScaffoldRegister: 'scaffoldRegister',
	updateScaffoldRegister: 'scaffoldRegister/:id',
}

export const serverClientRoutes = {
	getAllClients: 'clients',
	getClient: 'clients/:id',
	createClient: 'clients',
	updateClient: 'clients/:id',
}

export const serverContactRoutes = {
	getAllContacts: 'contacts',
	getContactsByClientID: 'clients/:id/contacts',
	getContact: 'contacts/:id',
	createContact: 'contacts',
	updateContact: 'contacts/:id',
}

export const serverQuoteRoutes = {
	getAllQuotes: 'quotes',
	getQuote: 'quotes/:id',
	createQuote: 'quotes',
	updateQuote: 'quotes/:id',
	getServiceRates: 'service_rates',
	quote_lines: 'quotes/:id/lines',
	quote_addons: 'quotes/:id/addons',
	quote_zones: 'quotes/:id/zones',
	quote_rates: 'quotes/:id/rates',
	sendQuoteEmail: 'quotes/:id/sendQuoteEmail',
	markAsPendingEmail: 'quotes/:id/markPendingEmail',
	declineQuote: 'quotes/:id/decline',
	approveQuote: 'quotes/:id/approve',
}

export const serverInvoiceRoutes = {
	getAllInvoices: 'invoices',
	getEDInvoicesByJobId: 'invoices/edinvoice/job/:id',
	getWeeklyInvoicesByJobId: 'invoices/weeklyHire/job/:id',
	getEdinvoice: 'invoices/edinvoice/:id',
	getWeeklyInvoice: 'invoices/weeklyHire/:id',
	createEdinvoice: 'invoices/edinvoice/job/:id',
	createWeeklyInvoice: 'invoices/weeklyHire/job/:id',
	updateEdinvoice: 'invoices/edinvoice/:id',
	updateWeeklyInvoice: 'invoices/weeklyHire/:id',
	deleteEdinvoice: 'invoices/edinvoice/:id',
	deleteWeeklyInvoice: 'invoices/weeklyHire/:id',
	approveInvoices: 'invoices/approve',
}

export const serverVisitRoutes = {
	getAllVisits: 'visits',
	getVisit: 'visits/:id',
	createVisit: 'visits',
	updateVisit: 'visits/:id',
	getVisitByJobId: 'visits/job/:id',
}

export const serverTimesheetRoutes = {
	getAllTimesheets: 'timesheets/all',
	getAllTimesheetsByStaffId: 'timesheets/staff/:id',
	getAllTimesheetsByJobId: 'timesheets/job/:id',
	getTimesheet: 'timesheets/:id',
	createTimesheet: 'timesheets',
	updateTimesheet: 'timesheets/:id',
}

export const serverLeavesRoutes = {
	getAllLeaves: 'leaves',
	getLeave: 'leaves/:id',
	createLeave: 'leaves',
	updateLeave: 'leaves/:id',
	getLeaveByStaffId: 'leaves/staff/:id',
}

export const serverVehicleRoutes = {
	getAllVehicles: 'vehicles',
	getVehicle: 'vehicles/:id',
	createVehicle: 'vehicles',
	updateVehicle: 'vehicles/:id',
}

export const serverAssetsRoutes = {
	getAllAssets: 'assets',
	getAsset: 'assets/:id',
	createAsset: 'assets',
	updateAsset: 'assets/:id',
}

export const serverFilesRoutes = {
	getAllFiles: 'files',
	getFile: 'files/:id',
	createFile: 'files',
	updateFile: 'files/:id',
}

export const serverSetUpRoute = 'setUpServer'
