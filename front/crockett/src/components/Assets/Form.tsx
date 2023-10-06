import {
	DateSelect,
	Dropdown,
	Input,
	SideModal,
	Spinner,
	TextArea,
	CreateFile,
} from 'common'
import { useFormik } from 'formik'
import {
	active_inactive_options,
	assetCategoriesOptions,
	assetTypeOptions,
} from 'models'
import moment from 'moment'
import { AssetServices, StaffServices } from 'services'
import { OptionsForDropdownFilter } from 'utilities'
import * as Yup from 'yup'

interface IProps {
	asset_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	manufacture_num: string
	asset_type: string
	asset_category: string
	make_type: string
	assigned_to: number
	date_assigned: string
	manufacture_date: string
	last_inspected: string
	next_inspection: string
	asset_expiry: string
	status: string
	comments: string
	photo_1: string
	photo_2: string
}

export const AssetsForm = ({
	asset_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: assetsData, isLoading: assetsLoading } =
		AssetServices.useAssetById(asset_id)

	const { data: staffData, isLoading: staffLoading } = StaffServices.useStaff()

	const { createAsset } = AssetServices.useCreateAssets()
	const { updateAsset } = AssetServices.useUpdateAssets()

	const initialValues: IinitialValues = {
		manufacture_num: assetsData?.manufacture_num || '',
		asset_type: assetsData?.asset_type || '',
		asset_category: assetsData?.asset_category || '',
		make_type: assetsData?.make_type || '',
		assigned_to: assetsData?.assigned_to || null,
		date_assigned: assetsData?.date_assigned
			? moment(assetsData.date_assigned, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		manufacture_date: assetsData?.manufacture_date
			? moment(assetsData.manufacture_date, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		last_inspected: assetsData?.last_inspected
			? moment(assetsData.last_inspected, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		next_inspection: assetsData?.next_inspection
			? moment(assetsData.next_inspection, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		asset_expiry: assetsData?.asset_expiry
			? moment(assetsData.asset_expiry, 'DD/MM/YYYY').format('DD/MM/YYYY')
			: moment().format('DD/MM/YYYY'),
		status: assetsData?.status || 'Active',
		comments: assetsData?.comments || '',
		photo_1: assetsData?.photo_1 || '',
		photo_2: assetsData?.photo_2 || '',
	}

	const validationSchema = Yup.object({})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'create') {
				createAsset(values)
			}
			if (formType === 'update' && asset_id) {
				updateAsset(asset_id, values)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (asset_id && (assetsLoading || staffLoading)) {
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
							id="manufacture_num"
							title="Manufacture Number"
							type="text"
							placeholder="Manufacture Number"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.manufacture_num}
							error={formik.errors.manufacture_num}
						/>
					</div>
					<div className="w-1/2">
						<Dropdown
							id="asset_type"
							label="Asset Type"
							onChange={formik.setFieldValue}
							value={formik.values.asset_type}
							error={formik.errors.asset_type}
							options={assetTypeOptions}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Dropdown
							id="asset_category"
							label="Asset Category"
							onChange={formik.setFieldValue}
							value={formik.values.asset_category}
							error={formik.errors.asset_category}
							options={assetCategoriesOptions}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="make_type"
							title="Make Type"
							type="text"
							placeholder="Make Type"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.make_type}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Dropdown
							id="assigned_to"
							label="Assigned To"
							onChange={formik.setFieldValue}
							value={formik.values.assigned_to}
							error={formik.errors.assigned_to}
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
						<DateSelect
							id="date_assigned"
							title="Date Assigned"
							value={formik.values.date_assigned}
							onChange={formik.setFieldValue}
							error={formik.errors.date_assigned}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<DateSelect
							id="manufacture_date"
							title="Manufacture Date"
							value={formik.values.manufacture_date}
							onChange={formik.setFieldValue}
							error={formik.errors.manufacture_date}
						/>
					</div>
					<div className="w-1/2">
						<DateSelect
							id="last_inspected"
							title="Last Inspected"
							value={formik.values.last_inspected}
							onChange={formik.setFieldValue}
							error={formik.errors.last_inspected}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<DateSelect
							id="next_inspection"
							title="Next Inspection"
							value={formik.values.next_inspection}
							onChange={formik.setFieldValue}
							error={formik.errors.next_inspection}
						/>
					</div>
					<div className="w-1/2">
						<DateSelect
							id="asset_expiry"
							title="Asset Expiry"
							value={formik.values.asset_expiry}
							onChange={formik.setFieldValue}
							error={formik.errors.asset_expiry}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between pl-2">
					<div className="w-1/2">
						<Dropdown
							id="status"
							label="Status"
							onChange={formik.setFieldValue}
							value={formik.values.status}
							error={formik.errors.status}
							options={active_inactive_options}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="w-full">
						<TextArea
							id="comments"
							title="Comments"
							rows={3}
							placeholder="Comments"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							value={formik.values.comments}
							error={formik.errors.comments}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<CreateFile
							field="photo_1"
							setFieldValue={formik.setFieldValue}
							value={formik.values.photo_1}
						/>
					</div>
					<div className="w-1/2">
						<CreateFile
							field="photo_2"
							setFieldValue={formik.setFieldValue}
							value={formik.values.photo_2}
						/>
					</div>
				</div>
			</SideModal>
		</>
	)
}
