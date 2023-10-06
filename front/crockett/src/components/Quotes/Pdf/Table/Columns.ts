const quote_lines = [
	{
		id: 'description',
		heading: 'Item Description',
	},
	{
		id: 'erect',
		heading: 'Erect & Dismantle (p/u)',
	},
	{
		id: 'fee',
		heading: 'Weekly Hire Fee',
	},
]

const quote_addons = [
	{
		id: 'additionalDesc',
		heading: 'Description',
	},
	{
		id: 'additionalTotal',
		heading: 'Additional Costs',
	},
]

export const columns = {
	quote_lines,
	quote_addons,
}

export enum ColumnTypes {
	quote_lines = 'quote_lines',
	quote_addons = 'quote_addons',
}
