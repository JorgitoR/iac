import { IQuoteLine, IQuoteZones, IRates, estimatedWay } from 'models'
import { calculateLine } from './quoteLinesOperations'

const initLine: IQuoteLine = {
	id: null,
	zone_id: null,
	zone_label: '',
	type: '',
	description: '',
	quantity: 0,
	total_days: 0,
	erect_and_dismantle: 0,
	percentage_weekly_hire_fee: 8,
	weekly_hire_fee: 0,
	total: 0,
	length: 0,
	height: 0,
	width: 0,
	total_dimensions: 0,
}

const addNewQuoteLine = (quote_lines: IQuoteLine[]): IQuoteLine[] => {
	quote_lines.push(initLine)
	return quote_lines
}

const removeQuoteLine = (
	index: number,
	quote_lines: IQuoteLine[]
): IQuoteLine[] => {
	const newQuoteLines = [...quote_lines]
	newQuoteLines.splice(index, 1)
	return newQuoteLines
}

const updateQuoteLine = (
	index: number,
	quote_lines: IQuoteLine[],
	field: string,
	value: string | number
): IQuoteLine[] => {
	const newQuoteLines: IQuoteLine[] = quote_lines.map((line, i) => {
		if (i === index) {
			const newLine = {
				...line,
				[field]: value,
			}
			if (field === 'type') {
				newLine.description = newLine.type
			}
			return newLine
		}
		return line
	})

	return newQuoteLines
}

const calculateQuoteLines = (
	rates: IRates[],
	optionToEstimate: estimatedWay | null,
	quote_lines: IQuoteLine[]
): IQuoteLine[] => {
	const newQuoteLines = quote_lines.map((line) => {
		const calculatedLine = calculateLine(rates, optionToEstimate, line)
		return calculatedLine
	})
	return newQuoteLines
}

const checkZones = (
	zones: IQuoteZones[],
	quote_lines: IQuoteLine[]
): IQuoteLine[] => {
	const newQuoteLines = quote_lines.map((line) => {
		const zone = zones.find((zone) => zone.zone_id === line.zone_id)

		if (!zone) {
			line.zone_id = null
			line.zone_label = ''
		} else {
			line.zone_label = zone.zone_label
		}
		return line
	})

	return newQuoteLines
}

export const quoteLinesFn = {
	addNewQuoteLine,
	removeQuoteLine,
	updateQuoteLine,
	calculateQuoteLines,
	checkZones,
}
