import { ContactServices } from 'services'
import { Spinner, Table } from 'common'
import { PencilIcon } from '@heroicons/react/24/solid'
import { ContacsForm } from 'components/Contacts/ContactForm'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppRoutes } from 'config'

interface ContactsTableProps {
	client_id?: number
}

export const ContactsTable = ({ client_id }: ContactsTableProps) => {
	const location = useLocation()
	const [openCreate, setOpenCreate] = useState(false)
	const { data: contacts, isLoading } =
		ContactServices.useContactsByClientId(client_id)

	if (isLoading) {
		return <Spinner />
	}

	const columns = [
		{
			field: 'name',
			header: 'Name',
		},
		{
			field: 'email',
			header: 'Email',
		},
		{
			field: 'phone',
			header: 'Phone',
		},
		{
			field: 'status',
			header: 'Status',
		},
		{
			field: 'id',
			header: 'Edit',
			body: (rowData: { id: string }) => (
				<Link
					to={{
						pathname: AppRoutes.privateRoutes.ClientContactEdit.replace(
							':id',
							rowData.id
						),
					}}
					state={{ background: location, name: 'editContact' }}>
					<PencilIcon className="text-gray-600 h-4 w-4" />
				</Link>
			),
		},
	]

	return (
		<>
			<Table
				title="Contact Details"
				columns={columns}
				data={contacts}
				isLoading={isLoading}
				ActionName="Add New Contact"
				setOpen={setOpenCreate}
				disableButtons
			/>
			<ContacsForm
				client_id={client_id}
				formType="create"
				heading="Create Contact"
				open={openCreate}
				setOpen={setOpenCreate}
			/>
		</>
	)
}
