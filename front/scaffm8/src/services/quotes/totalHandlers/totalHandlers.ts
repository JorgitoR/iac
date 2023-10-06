import { IQuoteAdditionalLines, IQuoteLine } from 'models'

export const totalsFn = {
	calculateEDtotal: (data: IQuoteLine[]): number => {
		return data.reduce((acc, curr) => acc + Number(curr.erect_and_dismantle), 0)
	},
	calculateAdditionalTotal: (data: IQuoteAdditionalLines[]): number => {
		return data.reduce((acc, curr) => acc + Number(curr.total_cost), 0)
	},
	calculateWeekTotal: (
		lines: IQuoteLine[],
		addons: IQuoteAdditionalLines[]
	): number => {
		const linesTotal = lines.reduce((acc, curr) => acc + Number(curr.total), 0)
		const addonsTotal = addons.reduce(
			(acc, curr) => acc + Number(curr.total_cost),
			0
		)
		return linesTotal + addonsTotal
	},
	calculateTotals: (
		edTotal: number,
		addOnsTotal: number,
		weekTotal: number
	): number => {
		return edTotal + addOnsTotal + weekTotal
	},
}
