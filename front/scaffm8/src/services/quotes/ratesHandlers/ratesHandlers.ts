import { IRates } from 'models'

const initRate: IRates = {
	id: null,
	type: 'Both',
	service: '',
	fee: 0,
}

const addNewRate = (
	rates: IRates[],
	setFieldValue: (field: string, value: IRates[]) => void
) => {
	const newRates = [...rates]
	newRates.push(initRate)
	setFieldValue('rates', newRates)
}

const removeRate = (
	index: number,
	rates: IRates[],
	setFieldValue: (field: string, value: IRates[]) => void
) => {
	const newRates = [...rates]
	newRates.splice(index, 1)
	setFieldValue('rates', newRates)
}

const updateRate = (
	index: number,
	rates: IRates[],
	setFieldValue: (field: string, value: IRates[]) => void,
	field: string,
	value: string | number
) => {
	const newRates = rates.map((rate, i) => {
		if (i === index) {
			return {
				...rate,
				[field]: value,
			}
		}
		return rate
	})
	setFieldValue('rates', newRates)
}

export const ratesFn = {
	addNewRate,
	removeRate,
	updateRate,
}
