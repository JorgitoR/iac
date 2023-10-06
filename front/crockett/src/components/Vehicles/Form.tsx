import {
	DateSelect,
	Dropdown,
	Input,
	SideModal,
	Spinner,
	TextArea,
} from 'common'
import { useFormik } from 'formik'
import { active_inactive_options } from 'models'
import moment from 'moment'
import { VehicleServices } from 'services'
import * as Yup from 'yup'

const OperationalStatusOptions = [
	{
		value: 'Operational',
		label: 'Operational',
	},
	{
		value: 'Issue',
		label: 'Issue',
	},
]

interface IProps {
	vehicle_id?: number
	heading: string
	setOpen: (open: boolean) => void
	formType: 'create' | 'update'
	open: boolean
}

interface IinitialValues {
	Rego: string
	Make: string
	Model: string
	CodeName: string
	RegoDue: string
	WOFDate: string
	ServiceDueDate: string
	ServiceDueKm: string
	Odometer: string
	Hubometer: string
	RUC: string
	OperationalStatus: string
	Status: string
	Date: string
	Lights: string
	CleanWindscreen: string
	CabTidy: string
	TyresDepth: string
	TyresPsi: string
	WasherFluid: string
	OilLevel: string
	BatteryLevel: string
	CoolantLevel: string
	AddBlue: string
	DPFLevel: string
	VehicleAccidentSheets: string
	Loadcharts: string
	BusinessCards: string
	HazardSheets: string
	RescueRopeScaffHook: string
	FirstAidKit: string
	Comment: string
}

export const VehiclesForm = ({
	vehicle_id,
	heading,
	setOpen,
	formType,
	open,
}: IProps) => {
	const { data: vehicleData, isLoading: vehicleLoading } =
		VehicleServices.useVehicleById(vehicle_id)

	const { createVehicle } = VehicleServices.useCreateVehicle()
	const { updateVehicle } = VehicleServices.useEditVehicle()

	const initialValues: IinitialValues = {
		Rego: vehicleData?.Rego || '',
		Make: vehicleData?.Make || '',
		Model: vehicleData?.Model || '',
		CodeName: vehicleData?.CodeName || '',
		RegoDue: vehicleData?.RegoDue || '',
		WOFDate: vehicleData?.WOFDate || '',
		ServiceDueDate: vehicleData?.ServiceDueDate || '',
		ServiceDueKm: vehicleData?.ServiceDueKm || '',
		Odometer: vehicleData?.Odometer || '',
		Hubometer: vehicleData?.Hubometer || '',
		RUC: vehicleData?.RUC || '',
		OperationalStatus: vehicleData?.OperationalStatus || 'Operational',
		Status: vehicleData?.Status || 'Active',
		Date: vehicleData?.Date || '',
		Lights: vehicleData?.Lights || '',
		CleanWindscreen: vehicleData?.CleanWindscreen || '',
		CabTidy: vehicleData?.CabTidy || '',
		TyresDepth: vehicleData?.TyresDepth || '',
		TyresPsi: vehicleData?.TyresPsi || '',
		WasherFluid: vehicleData?.WasherFluid || '',
		OilLevel: vehicleData?.OilLevel || '',
		BatteryLevel: vehicleData?.BatteryLevel || '',
		CoolantLevel: vehicleData?.CoolantLevel || '',
		AddBlue: vehicleData?.AddBlue || '',

		DPFLevel: vehicleData?.DPFLevel || '',
		VehicleAccidentSheets: vehicleData?.VehicleAccidentSheets || '',
		Loadcharts: vehicleData?.Loadcharts || '',
		BusinessCards: vehicleData?.BusinessCards || '',
		HazardSheets: vehicleData?.HazardSheets || '',
		RescueRopeScaffHook: vehicleData?.RescueRopeScaffHook || '',
		FirstAidKit: vehicleData?.FirstAidKit || '',
		Comment: vehicleData?.Comment || '',
	}

	const validationSchema = Yup.object({
		Rego: Yup.string().required('Rego is required'),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			if (formType === 'create') {
				createVehicle(values)
			}
			if (formType === 'update' && vehicle_id) {
				updateVehicle(vehicle_id, values)
			}
			setSubmitting(false)
			formik.resetForm()
			setOpen(false)
		},
	})

	if (vehicle_id && vehicleLoading) {
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
							id="Rego"
							title="Rego"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Rego"
							type="text"
							value={formik.values.Rego}
							error={formik.errors.Rego}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="Make"
							title="Make"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Make"
							type="text"
							value={formik.values.Make}
							error={formik.errors.Make}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="Model"
							title="Model"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Model"
							type="text"
							value={formik.values.Model}
							error={formik.errors.Model}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="CodeName"
							title="Code Name"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Code Name"
							type="text"
							value={formik.values.CodeName}
							error={formik.errors.CodeName}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<DateSelect
							id="RegoDue"
							onChange={formik.setFieldValue}
							title="Rego Due"
							value={
								moment(formik.values.RegoDue, 'DD/MM/YYYY', true).isValid()
									? formik.values.RegoDue
									: ''
							}
							error={formik.errors.RegoDue}
						/>
					</div>
					<div className="w-1/2">
						<DateSelect
							id="WOFDate"
							onChange={formik.setFieldValue}
							title="WOF Date"
							value={
								moment(formik.values.WOFDate, 'DD/MM/YYYY', true).isValid()
									? formik.values.WOFDate
									: ''
							}
							error={formik.errors.WOFDate}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<DateSelect
							id="ServiceDueDate"
							onChange={formik.setFieldValue}
							title="Service Due Date"
							value={
								moment(
									formik.values.ServiceDueDate,
									'DD/MM/YYYY',
									true
								).isValid()
									? formik.values.ServiceDueDate
									: ''
							}
							error={formik.errors.ServiceDueDate}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="ServiceDueKm"
							title="Service Due Km"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Service Due Km"
							type="text"
							value={formik.values.ServiceDueKm}
							error={formik.errors.ServiceDueKm}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="Odometer"
							title="Odometer"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Odometer"
							type="text"
							value={formik.values.Odometer}
							error={formik.errors.Odometer}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="Hubometer"
							title="Hubometer"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Hubometer"
							type="text"
							value={formik.values.Hubometer}
							error={formik.errors.Hubometer}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="RUC"
							title="RUC"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="RUC"
							type="text"
							value={formik.values.RUC}
							error={formik.errors.RUC}
						/>
					</div>
					<div className="w-1/2">
						<Dropdown
							id="OperationalStatus"
							label="Operational Status"
							onChange={formik.handleChange}
							options={OperationalStatusOptions}
							value={formik.values.OperationalStatus}
							error={formik.errors.OperationalStatus}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Dropdown
							id="Status"
							label="Status"
							onChange={formik.handleChange}
							options={active_inactive_options}
							value={formik.values.Status}
							error={formik.errors.Status}
						/>
					</div>
					<div className="w-1/2">
						<DateSelect
							id="Date"
							onChange={formik.setFieldValue}
							title="Date"
							value={formik.values.Date}
							error={formik.errors.Date}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="Lights"
							title="Lights"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Lights"
							type="text"
							value={formik.values.Lights}
							error={formik.errors.Lights}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="CleanWindscreen"
							title="Clean Windscreen"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Clean Windscreen"
							type="text"
							value={formik.values.CleanWindscreen}
							error={formik.errors.CleanWindscreen}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="CabTidy"
							title="Cab Tidy"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Cab Tidy"
							type="text"
							value={formik.values.CabTidy}
							error={formik.errors.CabTidy}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="TyresDepth"
							title="Tyres Depth"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Tyres Depth"
							type="text"
							value={formik.values.TyresDepth}
							error={formik.errors.TyresDepth}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="TyresPsi"
							title="Tyres Psi"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Tyres Psi"
							type="text"
							value={formik.values.TyresPsi}
							error={formik.errors.TyresPsi}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="WasherFluid"
							title="Washer Fluid"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Washer Fluid"
							type="text"
							value={formik.values.WasherFluid}
							error={formik.errors.WasherFluid}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="OilLevel"
							title="Oil Level"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Oil Level"
							type="text"
							value={formik.values.OilLevel}
							error={formik.errors.OilLevel}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="BatteryLevel"
							title="Battery Level"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Battery Level"
							type="text"
							value={formik.values.BatteryLevel}
							error={formik.errors.BatteryLevel}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="CoolantLevel"
							title="Coolant Level"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Coolant Level"
							type="text"
							value={formik.values.CoolantLevel}
							error={formik.errors.CoolantLevel}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="AddBlue"
							title="Add Blue"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Add Blue"
							type="text"
							value={formik.values.AddBlue}
							error={formik.errors.AddBlue}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="DPFLevel"
							title="DPF Level"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="DPF Level"
							type="text"
							value={formik.values.DPFLevel}
							error={formik.errors.DPFLevel}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="VehicleAccidentSheets"
							title="Vehicle Accident Sheets"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Vehicle Accident Sheets"
							type="text"
							value={formik.values.VehicleAccidentSheets}
							error={formik.errors.VehicleAccidentSheets}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="Loadcharts"
							title="Load Charts"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Load Charts"
							type="text"
							value={formik.values.Loadcharts}
							error={formik.errors.Loadcharts}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="BusinessCards"
							title="Business Cards"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Business Cards"
							type="text"
							value={formik.values.BusinessCards}
							error={formik.errors.BusinessCards}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="HazardSheets"
							title="Hazard Sheets"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Hazard Sheets"
							type="text"
							value={formik.values.HazardSheets}
							error={formik.errors.HazardSheets}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between px-2">
					<div className="w-1/2">
						<Input
							id="RescueRopeScaffHook"
							title="Rescue Rope Scaff Hook"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="Rescue Rope Scaff Hook"
							type="text"
							value={formik.values.RescueRopeScaffHook}
							error={formik.errors.RescueRopeScaffHook}
						/>
					</div>
					<div className="w-1/2">
						<Input
							id="FirstAidKit"
							title="First Aid Kit"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							labelInline
							placeholder="First Aid Kit"
							type="text"
							value={formik.values.FirstAidKit}
							error={formik.errors.FirstAidKit}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="w-full">
						<TextArea
							id="Comment"
							placeholder="Comments"
							rows={4}
							title="Comments"
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							value={formik.values.Comment}
							error={formik.errors.Comment}
						/>
					</div>
				</div>
			</SideModal>
		</>
	)
}
