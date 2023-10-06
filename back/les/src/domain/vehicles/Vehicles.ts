export class Vehicle {
	readonly id?: number
	readonly Rego: string
	readonly Make: string
	readonly Model: string
	readonly CodeName: string
	readonly RegoDue: string
	readonly WOFDate: string
	readonly ServiceDueDate: string
	readonly ServiceDueKm: string
	readonly Odometer: string
	readonly Hubometer: string
	readonly RUC: string
	readonly OperationalStatus: string
	readonly Status: string
	readonly Date: string
	readonly Lights: string
	readonly CleanWindscreen: string
	readonly CabTidy: string
	readonly TyresDepth: string
	readonly TyresPsi: string
	readonly WasherFluid: string
	readonly OilLevel: string
	readonly BatteryLevel: string
	readonly CoolantLevel: string
	readonly AddBlue: string
	readonly DPFLevel: string
	readonly VehicleAccidentSheets: string
	readonly Loadcharts: string
	readonly BusinessCards: string
	readonly HazardSheets: string
	readonly RescueRopeScaffHook: string
	readonly FirstAidKit: string
	readonly location?: { address: string; latitude: number; longitude: number }
	readonly Comment: string

	constructor(
		id: number,
		Rego: string,
		Make: string,
		Model: string,
		CodeName: string,
		RegoDue: string,
		WOFDate: string,
		ServiceDueDate: string,
		ServiceDueKm: string,
		Odometer: string,
		Hubometer: string,
		RUC: string,
		OperationalStatus: string,
		Status: string,
		Date: string,
		Lights: string,
		CleanWindscreen: string,
		CabTidy: string,
		TyresDepth: string,
		TyresPsi: string,
		WasherFluid: string,
		OilLevel: string,
		BatteryLevel: string,
		CoolantLevel: string,
		AddBlue: string,
		DPFLevel: string,
		VehicleAccidentSheets: string,
		Loadcharts: string,
		BusinessCards: string,
		HazardSheets: string,
		RescueRopeScaffHook: string,
		FirstAidKit: string,
		location: { address: string; latitude: number; longitude: number },
		Comment: string
	) {
		this.id = id
		this.Rego = Rego
		this.Make = Make
		this.Model = Model
		this.CodeName = CodeName
		this.RegoDue = RegoDue
		this.WOFDate = WOFDate
		this.ServiceDueDate = ServiceDueDate
		this.ServiceDueKm = ServiceDueKm
		this.Odometer = Odometer
		this.Hubometer = Hubometer
		this.RUC = RUC
		this.OperationalStatus = OperationalStatus
		this.Status = Status
		this.Date = Date
		this.Lights = Lights
		this.CleanWindscreen = CleanWindscreen
		this.CabTidy = CabTidy
		this.TyresDepth = TyresDepth
		this.TyresPsi = TyresPsi
		this.WasherFluid = WasherFluid
		this.OilLevel = OilLevel
		this.BatteryLevel = BatteryLevel
		this.CoolantLevel = CoolantLevel
		this.AddBlue = AddBlue
		this.DPFLevel = DPFLevel
		this.VehicleAccidentSheets = VehicleAccidentSheets
		this.Loadcharts = Loadcharts
		this.BusinessCards = BusinessCards
		this.HazardSheets = HazardSheets
		this.RescueRopeScaffHook = RescueRopeScaffHook
		this.FirstAidKit = FirstAidKit
		this.location = location
		this.Comment = Comment
	}
}
