import { Section, Spinner, Tabs, TwoColumnDetails } from 'common'
import { WeeklyHireTable } from 'components/Invoices'
import { EDInvoicesTable } from 'components/Invoices/EdInvoices/EdInvoicesTable'
import {
	JobTaskTable,
	HandoverFrom,
	JobVariationsTableTable,
} from 'components/Jobs'
import { Notes } from 'components/Notes'
import { ScaffoldRegisterTable } from 'components/ScaffoldRegister'
import { VisitsTable, VisitsTimesheetsTable } from 'components/Visits'
import { AppRoutes } from 'config'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { JobsServices } from 'services'

const items = [
	{ label: 'Tasks', id: 1 },
	{ label: 'Visits', id: 2 },
	{ label: 'Visit Timesheets', id: 3 },
	{ label: 'Scaffold Tags', id: 4 },
	{ label: 'Weekly Hire Invoices', id: 5 },
	{ label: 'edInvoices', id: 6 },
	{ label: 'Job Files', id: 7 },
	{ label: 'Quoted hours vs. Actual hours', id: 8 },
]

export const JobDetails = () => {
	const { id } = useParams()
	const location = useLocation()
	const jobId = parseInt(id || '') || undefined
	const [tabIndex, setTabIndex] = useState(1)
	const {
		data: job,
		isLoading,
		enableCreateUpdate,
	} = JobsServices.useJobById(jobId)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [handover, setHandover] = useState<any>({})
	const { data, isLoading: handoverLoading } =
		JobsServices.useHandoverByJobId(jobId)
	useEffect(() => {
		if (!data) return
		setHandover(data)
	}, [data])

	if (isLoading || handoverLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className="w-full mx-auto mt-8 mb-28">
				<TwoColumnDetails
					heading="Job Details"
					editBtn="Edit Job"
					editLink={{
						to: AppRoutes.privateRoutes.JobsEdit.replace(':id', id || ''),
						state: {
							background: location,
							name: 'editJob',
						},
					}}
					isEditable={enableCreateUpdate}>
					<Section title="Job #" content={job.job_num} />
					<Section title="Job Type" content={job.job_type} />
					<Section title="Client" content={job.clientData?.client_name} />
					<Section title="Site" content={job.site} />
					<Section
						title="Start Date"
						content={
							job.start_date
								? new Date(job.start_date).toLocaleDateString()
								: 'N/A'
						}
					/>
					<Section
						title="Finish Date"
						content={
							job.end_date ? new Date(job.end_date).toLocaleDateString() : 'N/A'
						}
					/>
					<Section title="Job Status" content={job.job_status} />
					<Section title="Status" content={job.status} />

					{/**Handover Details Section */}

					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						H&S Officer
					</h2>
					<div />
					<Section title="H&S Officer" content={handover.hs_officer} />
					<Section
						title="H&S Officer Phone #"
						content={handover?.hs_officer_phone}
					/>
					<Section
						title="H&S Officer Email"
						content={handover?.hs_officer_email}
					/>

					<div />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Client Site Contact
					</h2>
					<div />
					<Section
						title="Client Site Contact"
						content={handover?.site_forman}
					/>
					<Section
						title="Client Site Contact Phone"
						content={handover?.site_forman_phone}
					/>
					<Section
						title="Client Site Contact Email"
						content={handover?.site_forman_email}
					/>
					<Section title="Invoice Type" content={handover?.invoiceType} />

					<Section
						title="Handover Document"
						content={
							<HandoverFrom
								job_id={jobId}
								setHandover={setHandover}
								handover={handover}
							/>
						}
					/>
				</TwoColumnDetails>

				<div className="px-8">
					<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} tabs={items} />
				</div>
				{tabIndex === 1 && (
					<>
						<JobTaskTable job_id={jobId} />
						<JobVariationsTableTable job_id={jobId} client_id={job.client_id} />
					</>
				)}
				{tabIndex === 2 && <VisitsTable job_id={jobId} />}
				{tabIndex === 3 && <VisitsTimesheetsTable />}
				{tabIndex === 4 && <ScaffoldRegisterTable job_id={jobId} />}
				{tabIndex === 5 && <WeeklyHireTable job_id={jobId} />}
				{tabIndex === 6 && <EDInvoicesTable job_id={jobId} />}
				{tabIndex === 6 && <></>}
				{tabIndex === 7 && <Notes type="job" id={id || ''} />}
			</div>
		</>
	)
}
