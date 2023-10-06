import { Dropdown, Input, SideModal, Spinner } from 'common'
import { useFormik } from 'formik'
import { InvoiceServices, QuoteServices } from 'services'
import { OptionsForDropdown } from 'utilities'
import * as Yup from 'yup'

interface IProps {
	job_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	zone: string
	zone_label: string
	type: string
	Descripcion: string
	complete_percent: number
	total: number
}

export const EdInvoiceCreateForm = ({
	job_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: rates, isLoading } = QuoteServices.useServiceRates()

	const { createEdInvoice } = InvoiceServices.useCreateEDInvoice()

	const initialValues: IinitialValues = {
		zone: '',
		zone_label: '',
		type: '',
		Descripcion: '',
		complete_percent: 0,
		total: 0,
	}

	const validationSchema = Yup.object({})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'create') {
				createEdInvoice(Number(job_id), {
					zone: values.zone,
					zone_label: values.zone_label,
					type: values.type,
					Descripcion: values.Descripcion,
					complete_percent: Number(values.complete_percent),
					total: Number(values.total),
				})
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (isLoading) {
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
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							title="Zone"
							id="zone"
							type="text"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Zone"
							value={formik.values.zone}
							error={formik.errors.zone}
						/>
					</div>
					<div className="w-1/2">
						<Input
							title="Zone Label"
							id="zone_label"
							type="text"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Zone Label"
							value={formik.values.zone_label}
							error={formik.errors.zone_label}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Dropdown
							id="type"
							label="Type"
							onChange={formik.setFieldValue}
							onBlur={formik.handleBlur}
							value={formik.values.type}
							error={formik.errors.type}
							options={OptionsForDropdown(rates, 'service', 'service')}
						/>
					</div>
					<div className="w-1/2">
						<Input
							title="Description"
							id="Descripcion"
							type="text"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Description"
							value={formik.values.Descripcion}
							error={formik.errors.Descripcion}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							title="Complete Percent"
							id="complete_percent"
							type="number"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Complete Percent"
							value={formik.values.complete_percent}
							error={formik.errors.complete_percent}
						/>
					</div>
					<div className="w-1/2">
						<Input
							title="Total"
							id="total"
							type="number"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							placeholder="Total"
							value={formik.values.total}
							error={formik.errors.total}
						/>
					</div>
				</div>
			</SideModal>
		</>
	)
}
