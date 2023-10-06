import { Section, Spinner, TwoColumnDetails } from 'common'
import { AppRoutes } from 'config'
import { useLocation, useParams } from 'react-router-dom'
import { ClientServices } from 'services'
import { ContactsTable } from 'components/Contacts'
import { Notes } from 'components/Notes'

export const DetailsPage = () => {
	const { id } = useParams()
	const location = useLocation()
	const clientId = parseInt(id || '') || undefined
	const { data: client, isLoading } = ClientServices.useClientById(clientId)

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className="w-full mx-auto mt-8">
				<TwoColumnDetails
					heading="Client Details"
					editBtn="Edit Client"
					editLink={{
						to: AppRoutes.privateRoutes.ClientsEdit.replace(':id', id || ''),
						state: {
							background: location,
							name: 'editClient',
						},
					}}>
					<Section title="Client" content={client.client_name} />
					<Section title="Client Phone" content={client.phone} />
					<Section title="Client Email" content={client.email} />
					<Section title="Status" content={client.status} />
					<Section
						title="Main Contact Name"
						content={client.mainContactData?.name}
					/>
					<Section
						title="Main Contact Phone"
						content={client.mainContactData?.phone}
					/>
					<Section
						title="Main Contact Email"
						content={client.mainContactData?.email}
					/>
				</TwoColumnDetails>
				<Notes type="client" id={id || ''} />
				<>
					<ContactsTable client_id={clientId} />
				</>
			</div>
		</>
	)
}
