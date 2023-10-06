import { Input, SideModal, Spinner } from 'common'
import { useFormik } from 'formik'
import { InvoiceServices } from 'services'
import * as Yup from 'yup'

interface IProps {
	invoice_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	complete_percent: number
	total: number
}

export const EdInvoiceEditForm = ({
	invoice_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: invoiceData, isLoading: invoiceLoading } =
		InvoiceServices.useEdInvoiceById(invoice_id)

	const { updateEdInvoice } = InvoiceServices.useUpdateEDInvoice()

	const initialValues: IinitialValues = {
		complete_percent: invoiceData?.complete_percent || 0,
		total: invoiceData?.total || 0,
	}

	const validationSchema = Yup.object({})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'update' && invoice_id) {
				updateEdInvoice(invoice_id, values)
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
					<div className="w-1/2">
						<Input
							id="complete_percent"
							title="Complete Percent"
							placeholder="Complete Percent"
							type="number"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							value={formik.values.complete_percent}
							error={formik.errors.complete_percent}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="total"
							title="Total"
							placeholder="Total"
							type="number"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							value={formik.values.total}
							error={formik.errors.total}
						/>
					</div>
				</div>
			</SideModal>
		</>
	)
}
