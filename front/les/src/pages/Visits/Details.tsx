import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { TwoColumnDetails, Section } from 'common/Details'
import { Tabs, Spinner, ErrorComponent } from 'common'
import { VehicleServices } from 'services'
import { AppRoutes } from 'config'

export const DetailsPage = () => {
	const [tabIndex, setTabIndex] = useState(0)

	const { id } = useParams()
	const location = useLocation()

	const { data, error, isLoading } = VehicleServices.useVehicleById(id)

	const items = [
		{ label: 'Admin Files', id: 0 },
		{ label: 'App Files', id: 1 },
	]

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
				<TwoColumnDetails
					heading="Vehicle Details"
					editBtn="Edit Vehicles"
					editLink={{
						to: AppRoutes.privateRoutes.VehiclesEdit.replace(':id', id || ''),
						state: { background: location, name: 'editVehicle' },
					}}>
					<Section title="Vehicle Rego" content={data.Rego} />
					<Section title="Make" content={data.Make} />
					<Section title="Model" content={data.Model} />
					<Section title="Rego Due" content={data.RegoDue} />
					<Section title="WOF Due" content={data.WOFDate} />
					<Section title="Service Due Date" content={data.ServiceDueDate} />
					<Section title="Service Due Km" content={data.ServiceDueKm} />
					<Section title="Odometer" content={data.Odometer} />
					<Section title="Hubometer" content={data.Hubometer} />
					<div />
				</TwoColumnDetails>
			)}
			<div className="px-8">
				<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} tabs={items} />
			</div>
			{tabIndex === 0 && <div>Tab For Files</div>}

			{tabIndex === 1 && <div>Tab For Leave</div>}
		</div>
	)
}
