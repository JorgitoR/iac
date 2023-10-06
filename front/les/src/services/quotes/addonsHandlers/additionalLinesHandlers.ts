import { IQuoteAdditionalLines, IRates } from 'models'

const initLine: IQuoteAdditionalLines = {
	id: null,
	type: '',
	description: '',
	duration_quantity: 0,
	fixed_charge: 0,
	total_cost: 0,
}

const addNewQuoteLine = (
	lines: IQuoteAdditionalLines[]
): IQuoteAdditionalLines[] => {
	lines.push(initLine)
	return lines
}

const removeQuoteLine = (
	index: number,
	quote_lines: IQuoteAdditionalLines[]
): IQuoteAdditionalLines[] => {
	const newQuoteLines = [...quote_lines]
	newQuoteLines.splice(index, 1)
	return newQuoteLines
}

const updateQuoteLine = (
	index: number,
	quote_lines: IQuoteAdditionalLines[],
	field: string,
	value: string | number
): IQuoteAdditionalLines[] => {
	const newQuoteLines = quote_lines.map((line, i) => {
		if (i === index) {
			return {
				...line,
				[field]: value,
			}
		}
		return line
	})
	return newQuoteLines
}

const calculateLines = (
	lines: IQuoteAdditionalLines[],
	rates: IRates[]
): IQuoteAdditionalLines[] => {
	const newLines = lines.map((line) => {
		const rate = rates.find((rate) => rate.service === line.type)?.fee
		if (!rate) return line

		const newLine: IQuoteAdditionalLines = {
			...line,
			fixed_charge: rate,
			total_cost: rate * Number(line.duration_quantity),
		}
		return newLine
	})
	return newLines
}

export const quoteAdditionalLinesFn = {
	addNewQuoteLine,
	removeQuoteLine,
	updateQuoteLine,
	calculateLines,
}
