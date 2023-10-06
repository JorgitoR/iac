export enum estimatedWay {
	Hours = 'Hours',
	TotalED = 'Total ED',
	SQM = 'SQM',
}

export const estimatedWayOptions = Object.values(estimatedWay)
	.filter((v) => typeof v === 'string')
	.map((v) => v) as string[]

/* export const columnsQuoteLines = [
	'ZONES',
	'ZONE LABEL',
	'TYPE',
	'DESCRIPTION',
	'QUANTITY',
	'TOTAL DAYS',
	'ERECT & DISMANTLE (P/U)',
	'WEEKLY HIRE FEE (%)',
	'WEEKLY HIRE FEE (P/U)',
	'TOTAL',
] */

export interface IColumnsQuoteLines {
	title: string
	dataIndex: string
	key: string
	hidden: boolean
	enabled: boolean
	estimatedWayDisabled: [estimatedWay]
}

export const columnsQuoteLines: IColumnsQuoteLines[] = [
	{
		title: 'ZONES',
		dataIndex: 'zone_id',
		key: 'zone_id',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'ZONE LABEL',
		dataIndex: 'zone_label',
		key: 'zone_label',
		hidden: false,
		enabled: false,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'TYPE',
		dataIndex: 'type',
		key: 'type',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'DESCRIPTION',
		dataIndex: 'description',
		key: 'description',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'LENGTH',
		dataIndex: 'length',
		key: 'length',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.SQM],
	},
	{
		title: 'HEIGHT',
		dataIndex: 'height',
		key: 'height',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.SQM],
	},
	{
		title: 'WIDTH',
		dataIndex: 'width',
		key: 'width',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.SQM],
	},
	{
		title: 'TOTAL DIMENSIONS',
		dataIndex: 'total_dimensions',
		key: 'total_dimensions',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.SQM],
	},
	{
		title: 'QUANTITY',
		dataIndex: 'quantity',
		key: 'quantity',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'TOTAL DAYS',
		dataIndex: 'total_days',
		key: 'total_days',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'ERECT & DISMANTLE (P/U)',
		dataIndex: 'erect_and_dismantle',
		key: 'erect_and_dismantle',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'WEEKLY HIRE FEE (%)',
		dataIndex: 'percentage_weekly_hire_fee',
		key: 'percentage_weekly_hire_fee',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'WEEKLY HIRE FEE (P/U)',
		dataIndex: 'weekly_hire_fee',
		key: 'weekly_hire_fee',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
	{
		title: 'TOTAL',
		dataIndex: 'total',
		key: 'total',
		hidden: false,
		enabled: true,
		estimatedWayDisabled: [estimatedWay.TotalED],
	},
]

export const columnsQuoteAdditionalLines = [
	'Type',
	'Description',
	'Duration/Quantity',
	'Fixed Charge',
	'Total Cost',
]

export const columnsSQM = ['length', 'height', 'width', 'total_dimensions']
export const columnsHours = ['total_days', 'quantity']
export interface IQuoteForm {
	quote_type: string
	job_type: string
	variation_job_id: string | null
	PO_Number: string | null
	max_zones: number
	client: number | null
	client_contact: number | null
	quote_num?: string
	scope_of_work: string
	estimator: number | null

	fullAddress: string

	street: string
	street2: string
	city: string
	postal: string

	estimatedWay: estimatedWay | null

	quote_lines: IQuoteLine[]

	quote_additional_lines: IQuoteAdditionalLines[]

	terms: string

	erectDismantleTotal: number | string
	additionalTotal: number | string
	weekTotal: number | string
	total: number | string

	rates: IRates[]
	zones: IQuoteZones[]
}

export interface QuoteData {
	job_type: string
	id: number
	quote_num: string
	street: string
	street2: string
	city: string
	status: string
	created_at: string
	updated_at: string
	max_zones: number
	scope_of_work: string
	postal: string
	weekTotal: number
	total: number
	terms: string
	client_contact: null | number
	estimator: number
	approved_by: null | number
	variation_job_id: null | string
	quote_type: string
	clientType: null | string
	PO_Number: null | string
	estimatedWay: string
	additionalTotal: number
	erectDismantleTotal: number
	emailStatus: string
	longitude: number
	latitude: number
	fullAddress: string
	client: number
	createdAt: string
	updatedAt: string
	clientData: {
		id: number
		client_name: string
		phone: string
		email: string
	}
	contactData: {
		id: number
		name: string
		phone: string
		email: string
	}
	estimatorData: {
		id: number
		staff_name: string
		email: string
		mobile: string
	}
}

export interface QuoteDataToUpdate {
	job_type: string
	street: string
	street2: string
	city: string
	max_zones: number
	scope_of_work: string
	postal: string
	weekTotal: number
	total: number
	terms: string
	client_contact: null | number
	estimator: number
	variation_job_id: null | number
	quote_type: string
	PO_Number: null | string
	estimatedWay: string
	additionalTotal: number
	erectDismantleTotal: number
	fullAddress: string
	client: number
}

export interface IquoteLinesHandlers {
	addNewQuoteLine: () => void
	removeQuoteLine: (index: number) => void
	updateQuoteLine: (
		index: number,
		field: string,
		value: string | number
	) => void
	validateQuoteLinesColumns: (
		columnsQuoteLines: IColumnsQuoteLines[],
		estimatedWay: estimatedWay
	) => IColumnsQuoteLines[]
}

export interface IquoteAdditionalLinesHandlers {
	addNewQuoteAdditionalLine: () => void
	removeQuoteAdditionalLine: (index: number) => void
	updateQuoteAdditionalLine: (
		index: number,
		field: string,
		value: string | number
	) => void
}

export interface IQuoteAdditionalLines {
	id: string | number | null
	type: string
	description: string
	duration_quantity: number
	fixed_charge: number
	total_cost: number
}

export interface IQuoteLine {
	id: number | null
	zone_id: number | null
	zone_label: string
	type: string
	description: string
	quantity: number
	total_days: number
	erect_and_dismantle: number
	percentage_weekly_hire_fee: number
	weekly_hire_fee: number
	total: number
	length: number
	height: number
	width: number
	total_dimensions: number
}

export interface IRates {
	id: number | null
	type: string
	service: string
	fee: number
}

export interface IRatesHandlers {
	addNewRate: () => void
	removeRate: (index: number) => void
	updateRate: (index: number, field: string, value: string | number) => void
}

export interface IQuoteZones {
	id: string | number | null
	zone_id: string | number
	zone_label: string
	quote_id?: string
}

export interface IZonesHandlers {
	addNewZone: (zone_id: number) => void
	removeZone: (index: number) => void
	updateZone: (index: number, field: string, value: string | number) => void
}
