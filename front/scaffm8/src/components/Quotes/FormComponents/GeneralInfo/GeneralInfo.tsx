import { PlusCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { Dropdown, Input, SearchAddress, Spinner, TextArea } from 'common'
import { CreateClientsForm } from 'components/Clients'
import { ContacsForm } from 'components/Contacts'
import { ClientServices, ContactServices, StaffServices } from 'services'
import { OptionsForDropdown, OptionsForDropdownFilter } from 'utilities'
import { EstimaderWaySelector } from '../' //Import the Quote Form Elements
import { FormikProps } from 'formik'
import { IQuoteForm } from 'models'
import { AppStore } from 'redux/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const quoteTypeOptions = [
	{ value: 'New', label: 'New' },
	{
		value: 'Variation',
		label: 'Variation',
	},
]

interface FormProps {
	formik?: FormikProps<IQuoteForm>
	jobs_data?: object[]
}

const quoteZonesOptions = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
	{ value: '4', label: '4' },
	{ value: '5', label: '5' },
	{ value: '6', label: '6' },
]

const jobTypeOptions = [
	{
		value: 'Residential',
		label: 'Residential',
	},
	{
		value: 'Construction',
		label: 'Construction',
	},
	{
		value: 'Civil',
		label: 'Civil',
	},
	{
		value: 'Commercial',
		label: 'Commercial',
	},
]

export const GeneralInfo = ({ formik, jobs_data }: FormProps) => {
	const userState = useSelector((store: AppStore) => store.user)
	const clientsDataHook = ClientServices.useClients()
	const clientContactsDataHook = ContactServices.useContacts()
	const staffDataHook = StaffServices.useStaff()

	const [clientForm, setClientForm] = useState(false)
	const [contactForm, setContactForm] = useState(false)

	useEffect(() => {
		if (formik && clientsDataHook.data) {
			const defaultEstimator =
				staffDataHook.data?.find((staff) => staff.email === userState.email)
					?.id || 0
			formik.setFieldValue('estimator', defaultEstimator)
		}
	}, [staffDataHook.data])

	if (
		clientsDataHook.isLoading ||
		clientContactsDataHook.isLoading ||
		staffDataHook.isLoading ||
		!formik
	) {
		return <Spinner />
	}

	return (
		<>
			<div className="flex">
				{/*Quote Type Input */}
				<div className="w-1/2">
					<Dropdown
						label="New / Variation"
						id="quote_type"
						value={formik.values.quote_type}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
						options={quoteTypeOptions}
						error={formik.errors.quote_type}
					/>
				</div>
			</div>

			{formik.values.quote_type === 'Variation' && (
				<div className="flex">
					<div className="w-1/2">
						<Dropdown
							label="Job"
							id="variation_job_id"
							value={`${formik.values.variation_job_id}`}
							onChange={formik.setFieldValue}
							onBlur={formik.handleBlur}
							options={OptionsForDropdown(jobs_data, 'id', 'job_num')}
							error={formik.errors.variation_job_id}
						/>
					</div>
					<div className="w-1/2">
						<Input
							title="PO Number"
							id="PO_Number"
							type="text"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.PO_Number || ''}
							placeholder="PO Number"
							error={formik.errors.PO_Number}
						/>
					</div>
				</div>
			)}
			<div className="flex">
				{/*Quote Max Zones */}
				<div className="w-1/2">
					<Dropdown
						label="Max Zones"
						id="max_zones"
						value={`${formik.values.max_zones}`}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
						options={quoteZonesOptions}
						error={formik.errors.max_zones}
					/>
				</div>
				<div className="w-1/2">
					<Dropdown
						label="Job Type"
						id="job_type"
						value={`${formik.values.job_type}`}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
						options={jobTypeOptions}
						error={formik.errors.job_type}
					/>
				</div>
			</div>
			{/*Clients Section */}
			<div className="flex">
				<div className="w-1/2">
					<Dropdown
						label="Client"
						id="client"
						isLoading={clientsDataHook.isLoading}
						value={formik.values.client || ''}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
						options={OptionsForDropdown(
							clientsDataHook.data,
							'id',
							'client_name'
						)}
						error={formik.errors.client}
					/>
					<div className="flex items-center pl-4 -mt-3">
						<PlusCircleIcon className="w-6 h-6 text-indigo-500" />
						<button
							type="button"
							className="pl-1 font-semibold leading-5 text-sm text-gray-600 hover:text-gray-800"
							onClick={() => setClientForm(true)}>
							Add New Client
						</button>
					</div>
				</div>
				<div className="w-1/2">
					<Dropdown
						label="Client Contact"
						id="client_contact"
						isLoading={clientContactsDataHook.isLoading}
						value={formik.values.client_contact || ''}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
						disabled={formik.values.client === null}
						options={OptionsForDropdownFilter(
							clientContactsDataHook.data,
							'id',
							'name',
							'client_id',
							formik.values.client || ''
						)}
						error={formik.errors.client_contact}
					/>
					<div className="flex items-center pl-4 -mt-3">
						<PlusCircleIcon className="w-6 h-6 text-indigo-500" />
						<button
							type="button"
							className={clsx(
								formik.values.client === null
									? 'text-gray-200 cursor-none'
									: 'text-gray-600 hover:text-gray-800',
								'pl-1 font-semibold leading-5 text-sm'
							)}
							disabled={formik.values.client === null}
							onClick={() => setContactForm(true)}>
							Add New Contact
						</button>
					</div>
				</div>
			</div>
			<br />
			{/*Quote Number Section Only Renders in the Edit Mode but allways Disabled */}
			{formik.values.quote_num && (
				<div className="flex -ml-2">
					<div className="w-1/2">
						<Input
							title="Quote #"
							id="quote_num"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Quote Number"
							type="text"
							value={formik.values.quote_num || ''}
							disabled={true}
						/>
					</div>
				</div>
			)}
			{/*Quote Scope of Work */}
			<div className="flex">
				<div className="w-full">
					<TextArea
						title="Scope of Work"
						handleBlur={formik.handleBlur}
						handleChange={formik.handleChange}
						placeholder="Scope of Work"
						id="scope_of_work"
						value={formik.values.scope_of_work}
						error={formik.errors.scope_of_work}
						rows={5}
					/>
				</div>
			</div>
			{/*Quote Estimator */}
			<div className="flex">
				<div className="w-1/2">
					<Dropdown
						label="Estimator"
						id="estimator"
						value={formik.values.estimator || ''}
						onChange={formik.setFieldValue}
						onBlur={formik.handleBlur}
						options={OptionsForDropdown(staffDataHook.data, 'id', 'staff_name')}
					/>
				</div>
			</div>
			<h3 className="text-lg px-2 leading-6 font-large">Site Address</h3>
			{/*Quote Site Address */}
			<SearchAddress
				streetId="street"
				streetId2="street2"
				cityId="city"
				postalId="postal"
				streetVal={formik.values.street}
				street2Val={formik.values.street2}
				cityVal={formik.values.city}
				postalVal={formik.values.postal}
				handleChange={formik.handleChange}
				handleBlur={formik.handleBlur}
				setFieldValue={formik.setFieldValue}
			/>
			{/*Quote Estamation Mode */}
			<div className="flex">
				<div className="w-full">
					<EstimaderWaySelector
						estimatedWayVal={formik.values.estimatedWay}
						setFieldValue={formik.setFieldValue}
					/>
				</div>
			</div>
			<br />
			<CreateClientsForm
				open={clientForm}
				setOpen={setClientForm}
				heading="Create New Client"
				formType="create"
			/>
			<ContacsForm
				formType="create"
				heading="Create Contact"
				client_id={formik.values.client || undefined}
				open={contactForm}
				setOpen={setContactForm}
			/>
		</>
	)
}
