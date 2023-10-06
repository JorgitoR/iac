import { Dropdown, Input, SideModal, Spinner } from 'common'
import { useFormik } from 'formik'

import { ClientServices, ContactServices } from 'services'
import { OptionsForDropdown } from 'utilities'
import * as Yup from 'yup'

interface IProps {
	client_id?: string | number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

const statusOptions = [
	{ label: 'Active', value: 'Active' },
	{ label: 'Inactive', value: 'Inactive' },
]

interface createClientRow {
	client_name: string
	email: string
	phone: string
	status: string
	main_contact: string
}

export const EditClientsForm = ({
	client_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data, isLoading } = ClientServices.useClientById(client_id)
	const { updateClient } = ClientServices.useUpdateClients()
	const { data: contacts, isLoading: contactsLoading } =
		ContactServices.useContactsByClientId(Number(client_id))

	const initialValues: createClientRow = {
		client_name: data?.client_name || '',
		email: data?.email || '',
		phone: data?.phone || '',
		status: data?.status || 'Active',
		main_contact: data?.main_contact || null,
	}

	const validationSchema = Yup.object({
		client_name: Yup.string().required('Company is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		phone: Yup.string(),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true)

			const { client_name, email, phone, status, main_contact } = values

			const ClientData = {
				client_name,
				email,
				phone,
				status,
				main_contact,
			}

			await updateClient(ClientData, Number(client_id))

			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (client_id && (isLoading || contactsLoading)) {
		return <Spinner />
	}

	return (
		<>
			<SideModal
				heading={heading}
				open={open}
				setOpen={setOpen}
				handleSubmit={formik.handleSubmit}
				isLoading={formik.isSubmitting}
				formType={formType}>
				<div className="flex items-center">
					<Input
						title="Company"
						id="client_name"
						type="text"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.client_name}
						placeholder=""
						error={formik.errors.client_name}
					/>
				</div>
				<div className="flex items-center">
					<Input
						title="Contact #"
						id="phone"
						type="text"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.phone}
						placeholder=""
						error={formik.errors.phone}
					/>
					<Input
						title="Email"
						id="email"
						type="text"
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
						value={formik.values.email}
						placeholder=""
						error={formik.errors.email}
					/>
				</div>
				<div className="flex items-center">
					<Dropdown
						label="Main Contact"
						id="main_contact"
						options={OptionsForDropdown(contacts, 'id', 'name')}
						onChange={formik.setFieldValue}
						onBlur={formik.setFieldTouched}
						value={formik.values.main_contact}
						error={formik.errors.main_contact}
					/>
					<Dropdown
						label="Status"
						id="status"
						options={statusOptions}
						onChange={formik.setFieldValue}
						onBlur={formik.setFieldTouched}
						value={formik.values.status}
						error={formik.errors.status}
					/>
				</div>
			</SideModal>
		</>
	)
}
