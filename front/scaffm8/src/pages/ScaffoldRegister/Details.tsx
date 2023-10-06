import { useParams } from 'react-router-dom'

import { TwoColumnDetails, Section } from 'common/Details'
import { Spinner, ErrorComponent } from 'common'
import { ScaffolRegisterServices } from 'services'
import { dateFormat } from 'utilities'
import { AppFilesComponents } from 'components'

export const DetailsPage = () => {
	const { id } = useParams()

	const { data, error, isLoading } = ScaffolRegisterServices.useGetTagById(
		Number(id)
	)

	if (isLoading) {
		return (
			<div className="w-full h-48 flex justify-center items-center">
				<Spinner />
			</div>
		)
	}

	if (error) {
		return <ErrorComponent />
	}

	return (
		<div className="w-full mx-auto mt-8 mb-28">
			{data && (
				<TwoColumnDetails heading="Scaffold Register Details">
					<Section title="Job" content={data?.jobData?.job_num} />
					<Section title="Tag #" content={data?.tag_no} />
					<Section title="Description" content={data.description} />
					<Section
						title="Last Inspection"
						content={
							data.last_inspection
								? dateFormat.format(new Date(data.last_inspection))
								: ''
						}
					/>
					<Section
						title="Inspection Due"
						content={
							data.inspection_due
								? dateFormat.format(new Date(data.inspection_due))
								: ''
						}
					/>
					<Section
						title="Handover Doc"
						content={
							<a href={data.handover_doc}>{data.handover_doc ? 'Link' : ''}</a>
						}
					/>
					<Section
						title="Status"
						content={
							<a href={data.handover_doc}>{data.handover_doc ? 'Link' : ''}</a>
						}
					/>
					<Section title="Created By" content={data.uploaded_by} />
					<Section
						title="Date Created"
						content={dateFormat.format(new Date(data.createdAt))}
					/>
				</TwoColumnDetails>
			)}
			<AppFilesComponents.FileList type="scaffoldInspection" id={id || ''} />
		</div>
	)
}
