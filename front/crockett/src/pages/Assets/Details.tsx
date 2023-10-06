import { useState } from 'react'
import { Section, Spinner, Tabs, TwoColumnDetails } from 'common'
import { AppRoutes } from 'config'
import { useLocation, useParams } from 'react-router-dom'
import { AssetServices } from 'services'
import { Notes } from 'components/Notes'

export const DetailsPage = () => {
	const { id } = useParams()
	const [tabIndex, setTabIndex] = useState(0)
	const location = useLocation()
	const assetId = parseInt(id || '') || undefined
	const { data: client, isLoading } = AssetServices.useAssetById(assetId)

	const items = [
		{ label: 'Notes & Files', id: 0 },
		{ label: 'Leave', id: 1 },
	]

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className="w-full mx-auto mt-8">
				<TwoColumnDetails
					heading="Asset Details"
					editBtn="Edit Asset"
					isEditable
					editLink={{
						to: AppRoutes.privateRoutes.AssetsEdit.replace(':id', id || ''),
						state: {
							background: location,
							name: 'editAsset',
						},
					}}>
					<Section title="Asset #" content={client.id} />
					<Section title="Asset Type" content={client.asset_type} />
					<Section title="Manufactures #" content={client.manufacture_num} />
					<Section title="Date Assigned" content={client.date_assigned} />
					<Section title="Make / Type" content={client.make_type} />
					<Section title="Manufacture Date" content={client.manufacture_date} />
					<Section title="Asset Category" content={client.asset_category} />
					<Section title="Last Inspection" content={client.last_inspected} />
					<Section title="Assigned To" content={client.staffData?.staff_name} />
					<Section title="Next Inspection" content={client.next_inspection} />
					<Section title="Comments" content={client.comments} />
					<Section
						title="Photo 1"
						content={
							client.photo_1 && (
								<img
									src={client.photo_1}
									alt="asset"
									className="w-1/2 h-1/2 rounded-lg"
								/>
							)
						}
					/>
					<Section
						title="Photo 2"
						content={
							client.photo_2 && (
								<img
									src={client.photo_2}
									alt="asset"
									className="w-1/2 h-1/2 rounded-lg"
								/>
							)
						}
					/>
				</TwoColumnDetails>
				<div className="px-8">
					<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} tabs={items} />
				</div>
				{tabIndex === 0 && <Notes type="staff" id={id || ''} />}

				{tabIndex === 1 && <div>Tab For Leave</div>}
			</div>
		</>
	)
}
