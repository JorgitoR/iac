export const numberFormat = new Intl.NumberFormat('en-NZ', {
	style: 'currency',
	currency: 'NZD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
})

export const dateFormat = Intl.DateTimeFormat('en-NZ', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
})
