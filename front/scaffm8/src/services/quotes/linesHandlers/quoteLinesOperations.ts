import { IQuoteLine, IRates, estimatedWay } from 'models'

type OperationsQuoteLines = {
	[K in keyof typeof estimatedWay]: (
		line: IQuoteLine,
		rates: IRates[]
	) => IQuoteLine
}

const operationsHours = (line: IQuoteLine, rates: IRates[]): IQuoteLine => {
	const rate = rates.find((rate) => rate.service === line.type)?.fee
	if (!rate) {
		return line
	}
	const erectDismantleFee = Number(rate) * Number(line.quantity)
	const weekHireFee = Number(
		erectDismantleFee * (Number(line.percentage_weekly_hire_fee) / 100)
	).toFixed(2)
	const total = Number(erectDismantleFee) + Number(weekHireFee)
	const totalDays = (Number(line.quantity) / 8).toFixed(1)

	line.erect_and_dismantle = Number(erectDismantleFee.toFixed(2))
	line.weekly_hire_fee = Number(weekHireFee)
	line.total = Number(total.toFixed(2))
	line.total_days = Number(totalDays)

	return line
}

const operationsTotalED = (line: IQuoteLine, rates: IRates[]): IQuoteLine => {
	const rate = Number(rates.find((rate) => rate.service === line.type)?.fee)
	if (!rate) {
		return line
	}

	const quantity = (Number(line.erect_and_dismantle) / rate).toFixed(2)
	const weekHireFee = Number(
		Number(line.erect_and_dismantle) *
			(Number(line.percentage_weekly_hire_fee) / 100)
	).toFixed(2)
	const total = Number(line.erect_and_dismantle) + Number(weekHireFee)
	const totalDays = (Number(line.quantity) / 8).toFixed(1)

	line.quantity = Number(quantity)
	line.weekly_hire_fee = Number(weekHireFee)
	line.total = Number(total.toFixed(2))
	line.total_days = Number(totalDays)
	return line
}

const operationsSQM = (line: IQuoteLine, rates: IRates[]): IQuoteLine => {
	const rate = Number(rates.find((rate) => rate.service === line.type)?.fee)
	if (!rate) {
		return line
	}
	line.percentage_weekly_hire_fee = Number(line.percentage_weekly_hire_fee)
	line.quantity = 1
	line.total_dimensions =
		Number(line.length) * Number(line.height) * Number(line.width)
	line.erect_and_dismantle = Number(rate) * Number(line.total_dimensions)
	line.weekly_hire_fee =
		Number(line.erect_and_dismantle) *
		(Number(line.percentage_weekly_hire_fee) / 100)
	line.total = Number(line.erect_and_dismantle) + Number(line.weekly_hire_fee)
	return line
}

const operationsQuoteLines: OperationsQuoteLines = {
	Hours: (line, rates) => operationsHours(line, rates),
	TotalED: (line, rates) => operationsTotalED(line, rates),
	SQM: (line, rates) => operationsSQM(line, rates),
}

export const calculateLine = (
	rates: IRates[],
	optionToEstimate: estimatedWay | null,
	lineIQuoteLine: IQuoteLine
) => {
	switch (optionToEstimate) {
		case estimatedWay.Hours:
			return operationsQuoteLines.Hours(lineIQuoteLine, rates)
		case estimatedWay.TotalED:
			return operationsQuoteLines.TotalED(lineIQuoteLine, rates)
		case estimatedWay.SQM:
			return operationsQuoteLines.SQM(lineIQuoteLine, rates)
		default:
			return lineIQuoteLine
	}
}
