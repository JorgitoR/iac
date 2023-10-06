import { DocumentIcon } from '@heroicons/react/24/outline'
import { ConfirmationDialog, Button, Dropdown, Input, DateSelect } from 'common'
import { JobsServices, StaffServices } from 'services'
import { ProgressSpinner } from 'primereact/progressspinner'
import moment from 'moment'
import { useFormik } from 'formik'
import { useState } from 'react'
import { OptionsForDropdownFilter } from 'utilities'

const yesNoOptions = [
	{
		value: 'Yes',
		label: 'Yes',
	},
	{
		value: 'No',
		label: 'No',
	},
]

const invoiceTypeOptions = [
	{ value: 'Payment Claim', label: 'Payment Claim' },
	{ value: 'Invoice', label: 'Invoice' },
]
interface IProps {
	job_id: number | undefined
	setHandover: (value: string | number) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handover: any
}

interface IinitialValues {
	billing_address: string
	credit_check: string
	work_safe: string
	sssp_added: string
	hs_officer_phone: string
	hs_officer_email: string
	site_forman_email: string
	site_forman_phone: string
	gear_shortages: string
	allowed_quote: string
	engaged_engineer: string
	staff_availability: string
	booked_shrinkwrappers: string
	credit_check_who: string
	credit_check_when: string
	swms_added: string
	worksafe_uploaded: string
	worksafe_uploaded_when: string
	hs_officer: string
	site_forman: string
	invoiceType: string
	hs_officer_client: string
	hs_officer_client_number: string
	hs_officer_client_email: string
	site_forman2: string
	site_forman_phone2: string
	site_forman_email2: string
	operation_assignee: string
}

export const HandoverFrom = ({ job_id, setHandover, handover }: IProps) => {
	const [updateLoading, setUpdateLoading] = useState(false)
	const { update } = JobsServices.useUpdateHandover()
	const { data: staffData } = StaffServices.useStaff()

	const initialValues: IinitialValues = {
		// Financials
		billing_address: handover?.billing_address || 'No',
		allowed_quote: handover?.allowed_quote || ' ',
		credit_check: handover?.credit_check || 'No',
		credit_check_who: handover?.credit_check_who || ' ',
		credit_check_when:
			handover?.credit_check_when !== 'Invalid date' &&
			handover?.credit_check_when !== ' ' &&
			handover?.credit_check_when
				? moment(handover?.credit_check_when, 'DD/MM/YYYY').format('DD/MM/YYYY')
				: '',
		invoiceType: handover?.invoiceType || '',
		hs_officer: handover?.hs_officer || '',
		hs_officer_phone: handover?.hs_officer_phone || '',
		hs_officer_email: handover?.hs_officer_email || '',
		operation_assignee: handover?.operation_assignee || ' ',
		site_forman: handover?.site_forman || ' ',
		site_forman_email: handover?.site_forman_email || ' ',
		site_forman_phone: handover?.site_forman_phone || ' ',
		work_safe: handover?.work_safe || ' ',
		worksafe_uploaded: handover?.worksafe_uploaded || ' ',
		worksafe_uploaded_when: handover?.worksafe_uploaded_when
			? moment(handover?.worksafe_uploaded_when).format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		sssp_added: handover?.sssp_added || ' ',
		swms_added: handover?.swms_added || ' ',
		site_forman2: handover?.site_forman2 || ' ',
		site_forman_email2: handover?.site_forman_email2 || ' ',
		site_forman_phone2: handover?.site_forman_phone2 || ' ',
		gear_shortages: handover?.gear_shortages || ' ',
		engaged_engineer: handover?.engaged_engineer || ' ',
		staff_availability: handover?.staff_availability || ' ',
		booked_shrinkwrappers: handover?.booked_shrinkwrappers || ' ',
		hs_officer_client: handover?.hs_officer_client || ' ',
		hs_officer_client_number: handover?.hs_officer_client_number || ' ',
		hs_officer_client_email: handover?.hs_officer_client_email || ' ',
	}
	const formik = useFormik({
		initialValues,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			const body = {
				...initialValues,
				billing_address: values.billing_address,
				credit_check: values.credit_check,
				credit_check_who: values.credit_check_who,
				credit_check_when: values.credit_check_when || ' ',
				invoiceType: values.invoiceType,
				hs_officer: values.hs_officer,
				hs_officer_phone: values.hs_officer_phone,
				hs_officer_email: values.hs_officer_email,
				operation_assignee: parseInt(values.operation_assignee),
				site_forman: values.site_forman,
				site_forman_email: values.site_forman_email,
				site_forman_phone: values.site_forman_phone,
			}
			try {
				setUpdateLoading(true)
				const feedbackMessage =
					handover.invoiceType == ''
						? 'Document created successfully'
						: 'Job updated successfully'
				await update(handover.id, body, feedbackMessage)
				setHandover({
					...handover,
					...body,
				})
			} finally {
				setUpdateLoading(false)
				setSubmitting(false)
				formik.resetForm()
			}
		},
	})

	if (!job_id) {
		return <></>
	}
	return (
		<ConfirmationDialog
			size="4xl"
			icon="info"
			title="Job Handover Document"
			body=""
			triggerButton={
				<Button
					size="sm"
					variant="inverse"
					className="mt-4"
					startIcon={<DocumentIcon className="w-4 h-4" />}>
					Handover Document
				</Button>
			}
			confirmButton={
				updateLoading ? (
					<ProgressSpinner
						style={{ width: '50px', height: '50px' }}
						strokeWidth="8"
						fill="var(--surface-ground)"
						animationDuration=".5s"
					/>
				) : (
					<Button
						type="submit"
						form="handoverForm"
						variant="approve"
						size="md"
						onClick={() => {
							formik.handleSubmit()
						}}>
						{handover.invoiceType == '' ? (
							<>Create Handover Document</>
						) : (
							<>Update Handover Document</>
						)}
					</Button>
				)
			}>
			<div>
				{/** ****************************************
				 *
				 * FINANCIALS
				 *
				 **************************************** */}
				<div>
					<h2 className="pl-4 text-md leading-6 uppercase text-gray-700 my-4">
						FINANCIALS
					</h2>
					<div className="border-b" />
					<div className="flex items-center">
						<Dropdown
							label="Billing Address Same as Client?"
							id="billing_address"
							value={formik.values.billing_address}
							error={formik.errors.billing_address}
							onChange={formik.setFieldValue}
							onBlur={formik.setFieldTouched}
							options={yesNoOptions}
						/>
						<Dropdown
							label="Credit Check Completed?"
							id="credit_check"
							value={formik.values.credit_check}
							error={formik.errors.credit_check}
							onChange={formik.setFieldValue}
							onBlur={formik.setFieldTouched}
							options={yesNoOptions}
						/>
					</div>
					{formik.values.credit_check === 'Yes' ? (
						<div className="flex items-center">
							<Input
								title="By Who?"
								id="credit_check_who"
								placeholder=""
								type="text"
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
								value={formik.values.credit_check_who}
								error={formik.errors.credit_check_who}
							/>
							<DateSelect
								title="When?"
								id="credit_check_when"
								value={formik.values.credit_check_when}
								error={formik.errors.credit_check_when}
								onChange={formik.setFieldValue}
							/>
						</div>
					) : (
						<></>
					)}
					<div className="flex items-center">
						<Dropdown
							label="Invoice Type"
							id="invoiceType"
							value={formik.values.invoiceType}
							error={formik.errors.invoiceType}
							onChange={formik.setFieldValue}
							onBlur={formik.setFieldTouched}
							options={invoiceTypeOptions}
						/>
					</div>
				</div>
				{/** ****************************************
				 *
				 * HEALTH & SAFETY
				 *
				 **************************************** */}
				<div>
					<h2 className="pl-4 text-md leading-6 uppercase text-gray-700 my-4">
						Health & Safety
					</h2>
					<div className="border-b" />

					<div className="flex items-center">
						<Input
							title="H&S Officer"
							placeholder=""
							id="hs_officer"
							type="text"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.hs_officer}
							error={formik.errors.hs_officer}
						/>
						<Input
							title="H&S Officer Phone #"
							placeholder=""
							id="hs_officer_phone"
							type="text"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.hs_officer_phone}
							error={formik.errors.hs_officer_phone}
						/>
						<Input
							title="H&S Officer Email"
							placeholder=""
							id="hs_officer_email"
							type="text"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.hs_officer_email}
							error={formik.errors.hs_officer_email}
						/>
					</div>
				</div>

				{/** ****************************************
				 *
				 * OPERATIONS
				 *
				 **************************************** */}
				<div>
					<h2 className="pl-4 text-md leading-6 uppercase text-gray-700 my-4">
						Operations
					</h2>
					<div className="border-b" />
					<div className="w-1/2">
						<Dropdown
							label="Leading Hand"
							id="operation_assignee"
							value={formik.values.operation_assignee}
							error={formik.errors.operation_assignee}
							onChange={formik.setFieldValue}
							onBlur={formik.setFieldTouched}
							options={OptionsForDropdownFilter(
								staffData,
								'id',
								'staff_name',
								'status',
								'Active'
							)}
						/>
					</div>
					<div className="w-1/2">
						<Input
							title="Client Site Contact"
							placeholder=""
							id="site_forman"
							type="text"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.site_forman}
							error={formik.errors.site_forman}
						/>
					</div>
					<div className="flex items-center">
						<Input
							title="Client Site Contact Phone"
							placeholder=""
							id="site_forman_phone"
							type="text"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.site_forman_phone}
							error={formik.errors.site_forman_phone}
						/>
						<Input
							title="Client Site Contact Email"
							placeholder=""
							id="site_forman_email"
							type="text"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.site_forman_email}
							error={formik.errors.site_forman_email}
						/>
					</div>
				</div>
			</div>
		</ConfirmationDialog>
	)
}
