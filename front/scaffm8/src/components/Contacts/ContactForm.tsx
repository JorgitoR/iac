import { Dropdown, Input, SideModal, Spinner } from 'common'
import { useFormik } from 'formik'

import { ClientServices, ContactServices } from 'services'
import { OptionsForDropdown } from 'utilities'
import * as Yup from 'yup'
interface IProps {
	client_id?: number
	contact_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

const statusOptions = [
	{ label: 'Active', value: 'Active' },
	{ label: 'Inactive', value: 'Inactive' },
]

interface ContactRow {
	name: string
	client_id: number
	email: string
	phone: string
	status: string
}

export const ContacsForm = ({
	contact_id,
	client_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { createContact } = ContactServices.useCreateContact()
	const { updateContact } = ContactServices.useUpdateContact()
	const { data, isLoading } = ContactServices.useContactsById(contact_id)
	const { data: clientsData, isLoading: clientsLoading } =
		ClientServices.useClients()

	const initialValues: ContactRow = {
		name: data?.name || '',
		client_id: data?.client_id || Number(client_id) || null,
		email: data?.email || '',
		phone: data?.phone || '',
		status: data?.status || 'Active',
	}

	const validationSchema = Yup.object({
		name: Yup.string().required('Main Contact Name is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Main Contact Email is required'),
		phone: Yup.string(),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true)

			if (formType === 'create') {
				const { name, email, phone, status } = values

				const ContactData = {
					name,
					email,
					phone,
					status,
					client_id: Number(client_id),
				}
				await createContact(ContactData)
			} else {
				const { name, email, phone, status } = values

				const ContactData = {
					name,
					email,
					phone,
					status,
				}
				await updateContact(ContactData, Number(contact_id))
			}

			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (client_id && (isLoading || clientsLoading)) {
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
				<>
					<div className="flex items-center">
						<div className="w-1/2">
							<Input
								title="Contact Name"
								id="name"
								type="text"
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
								value={formik.values.name}
								placeholder=""
								error={formik.errors.name}
							/>
						</div>
						<div className="w-1/2">
							<Dropdown
								label="Client"
								id="client_id"
								options={OptionsForDropdown(clientsData, 'id', 'client_name')}
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
								value={formik.values.client_id}
								error={formik.errors.client_id}
							/>
						</div>
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
							label="Status"
							id="status"
							options={statusOptions}
							onChange={formik.setFieldValue}
							onBlur={formik.setFieldTouched}
							value={formik.values.status}
							error={formik.errors.status}
						/>
					</div>
				</>
			</SideModal>
		</>
	)
}
