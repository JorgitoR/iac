export class Asset {
	readonly id?: number
	readonly manufacture_num: string
	readonly item_code: string
	readonly asset_type: string
	readonly asset_category: string
	readonly assigned_to: string
	readonly last_inspected: string
	readonly next_inspection: string
	readonly asset_expiry: string
	readonly created_at: Date
	readonly status: string
	readonly date_assigned: string
	readonly manufacture_date: string
	readonly make_type: string
	readonly comments: string
	readonly photo_1: string
	readonly photo_2: string
	readonly hardwareStatus: string
	readonly hardwareComments: string
	readonly webbingStatus: string
	readonly webbingComments: string
	readonly stitchingStatus: string
	readonly stitchingComments: string
	readonly labelsStatus: string
	readonly labelsComments: string
	readonly syntheticropeStatus: string
	readonly syntheticropeComments: string
	readonly energycomponentStatus: string
	readonly energycomponentComments: string
	readonly overall: string

	constructor(
		id: number,
		manufacture_num: string,
		item_code: string,
		asset_type: string,
		asset_category: string,
		assigned_to: string,
		last_inspected: string,
		next_inspection: string,
		asset_expiry: string,
		created_at: Date,
		status: string,
		date_assigned: string,
		manufacture_date: string,
		make_type: string,
		comments: string,
		photo_1: string,
		photo_2: string,
		hardwareStatus: string,
		hardwareComments: string,
		webbingStatus: string,
		webbingComments: string,
		stitchingStatus: string,
		stitchingComments: string,
		labelsStatus: string,
		labelsComments: string,
		syntheticropeStatus: string,
		syntheticropeComments: string,
		energycomponentStatus: string,
		energycomponentComments: string,
		overall: string
	) {
		this.id = id
		this.manufacture_num = manufacture_num
		this.item_code = item_code
		this.asset_type = asset_type
		this.asset_category = asset_category
		this.assigned_to = assigned_to
		this.last_inspected = last_inspected
		this.next_inspection = next_inspection
		this.asset_expiry = asset_expiry
		this.created_at = created_at
		this.status = status
		this.date_assigned = date_assigned
		this.manufacture_date = manufacture_date
		this.make_type = make_type
		this.comments = comments
		this.photo_1 = photo_1
		this.photo_2 = photo_2
		this.hardwareStatus = hardwareStatus
		this.hardwareComments = hardwareComments
		this.webbingStatus = webbingStatus
		this.webbingComments = webbingComments
		this.stitchingStatus = stitchingStatus
		this.stitchingComments = stitchingComments
		this.labelsStatus = labelsStatus
		this.labelsComments = labelsComments
		this.syntheticropeStatus = syntheticropeStatus
		this.syntheticropeComments = syntheticropeComments
		this.energycomponentStatus = energycomponentStatus
		this.energycomponentComments = energycomponentComments
		this.overall = overall
	}
}
