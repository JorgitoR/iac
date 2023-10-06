import { Dropdown, Input, SideModal, Spinner, DateSelect } from 'common'
import { useFormik } from 'formik'
import { InvoiceServices } from 'services'
import moment from 'moment'
import * as Yup from 'yup'
import { yes_no_options } from 'models'

interface IProps {
	invoice_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	on_hire: string
	description: string
	erect_percent: number
	date_on_hire: string | null
	completed_date: string | null
}

export const WeeklyHireInvoiceEditForm = ({
	invoice_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: invoiceData, isLoading: invoiceLoading } =
		InvoiceServices.useWeeklyHireInvoiceById(invoice_id)

	const { updateWeeklyHire } = InvoiceServices.useUpdateWeeklyHireInvoice()

	const initialValues: IinitialValues = {
		on_hire: invoiceData?.on_hire || '',
		description: invoiceData?.description || '',
		erect_percent: invoiceData?.erect_percent || 0,
		date_on_hire: invoiceData?.date_on_hire
			? moment(invoiceData?.date_on_hire, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: null,
		completed_date: invoiceData?.completed_date
			? moment(invoiceData?.completed_date, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: null,
	}

	const validationSchema = Yup.object({})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'update' && invoice_id) {
				updateWeeklyHire(invoice_id, values)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (invoice_id && invoiceLoading) {
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
				<div className="flex items-center px-2">
					<div className="w-full">
						<Input
							id="description"
							title="Description"
							placeholder="Description"
							type="text"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							value={formik.values.description}
							error={formik.errors.description}
						/>
					</div>
				</div>
				<div className="flex items-center px-2">
					<div className="w-1/2">
						<Input
							id="erect_percent"
							title="Percent Erect"
							placeholder="Percent Erect"
							type="number"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							value={formik.values.erect_percent}
							error={formik.errors.erect_percent}
						/>
					</div>

					<div className="w-1/2">
						<Dropdown
							id="on_hire"
							label="On Hire"
							onChange={formik.setFieldValue}
							onBlur={formik.handleBlur}
							options={yes_no_options}
							value={formik.values.on_hire}
							error={formik.errors.on_hire}
						/>
					</div>
				</div>
				<div className="flex items-center px-2">
					<div className="w-1/2">
						<DateSelect
							id="date_on_hire"
							title="Date On Hire"
							onChange={formik.setFieldValue}
							value={formik.values.date_on_hire}
							error={formik.errors.date_on_hire}
						/>
					</div>
					<div className="w-1/2">
						<DateSelect
							id="completed_date"
							title="Completed Date"
							onChange={formik.setFieldValue}
							value={formik.values.completed_date}
							error={formik.errors.completed_date}
						/>
					</div>
				</div>
			</SideModal>
		</>
	)
}
