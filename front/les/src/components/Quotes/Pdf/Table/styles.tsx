import { StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
	family: 'Open Sans',
	fonts: [
		{
			src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
		},
		{
			src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf',
			fontWeight: 600,
		},
	],
})

export const tableStyles = StyleSheet.create({
	tableContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 2,
		borderWidth: 1,
		borderColor: '#E5E7EB',
	},
})

const HeaderBorderColor = '#D1D5DB'

export const headerStyles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'row',
		paddingVertical: 2,
		backgroundColor: '#E5E7EB',
		alignItems: 'center',
		textAlign: 'left',
		color: '#1F2937',
		fontFamily: 'Open Sans',
		fontSize: 7.4,
		fontWeight: 'semibold',
	},
	description: {
		width: '60%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		textAlign: 'left',
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	quantity: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	// TODO: PDF Output styling + Correct total sums (Item*Qty)
	erect: {
		width: '20%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	type: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	rate: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	duration: {
		width: '20%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	fee: {
		width: '20%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 20,
		paddingRight: 5,
		fontSize: 7.6,
		alignContent: 'center',
	},
	total: {
		width: '15%',
		paddingLeft: 8,
		fontSize: 7.6,
	},

	// Zones
	zone: {
		width: '48.4%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	label: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	erectZone: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	hireTotal: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	zoneTotal: {
		width: '15%',
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},

	// Additional Items
	additionalDesc: {
		width: '83%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	additionalDuration: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	charge: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	weekly: {
		width: '18.3%',
		borderRightColor: HeaderBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	additionalTotal: {
		width: '15%',
		paddingLeft: 13,
		paddingRight: 3,
		fontSize: 7.6,
	},
	// Summary Columns

	summaryConcept: {
		width: '85%',
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
	summaryTotalCost: {
		width: '15%',
		paddingLeft: 8,
		paddingRight: 3,
		fontSize: 7.6,
	},
})

const QuoteLineborderColor = '#F3F4F6'

export const QuoteLineRow = StyleSheet.create({
	row: {
		flexGrow: 1,
		flexDirection: 'row',
		borderBottomColor: '#F3F4F6',
		borderBottomWidth: 1,
		fontFamily: 'Open Sans',
		fontSize: 7.4,
	},
	description: {
		textWrap: 'nowrap',
		textOverflow: 'ellipsis',
		flexDirection: 'column',
		width: '60%',
		textAlign: 'left',
		borderRightColor: QuoteLineborderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
	},
	quantity: {
		width: '20%',
		borderRightColor: QuoteLineborderColor,
		borderRightWidth: 1,
		textAlign: 'center',
		paddingLeft: 8,
		paddingRight: 3,
	},
	erect: {
		width: '20%',
		borderRightColor: QuoteLineborderColor,
		borderRightWidth: 1,
		textAlign: 'center',
		paddingRight: 8,
	},
	rate: {
		width: '18.3%',
		borderRightColor: QuoteLineborderColor,
		borderRightWidth: 1,
		textAlign: 'left',
		paddingLeft: 8,
		paddingRight: 3,
	},
	duration: {
		width: '20%',
		borderRightColor: QuoteLineborderColor,
		borderRightWidth: 1,
		textAlign: 'center',
	},
	weekly: {
		width: '20%',
		textAlign: 'center',
		borderRightColor: QuoteLineborderColor,
		borderRightWidth: 1,
		paddingRight: 8,
	},
	total: {
		width: '15%',
		textAlign: 'right',
		paddingLeft: 8,
		paddingRight: 3,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
	},
})

export const GroupStyles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		borderBottomColor: '#E5E7EB',
		borderBottomWidth: 1,
		alignItems: 'center',
		height: 13,
		fontFamily: 'Open Sans',
		fontSize: 8,
		fontWeight: 'semibold',
		color: 'white',
		backgroundColor: '#F9FAFB',
	},
	blankRow: {
		width: '100%',
		color: '#1F2937',
		paddingLeft: 8,
	},
})

const quoteLinesFooterBorderColor = '#E5E7EB'

export const QuoteLinesFoorter = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 13,
		fontFamily: 'Open Sans',
		fontSize: 7.4,
		fontWeight: 'semibold',
		color: '#1F2937',
	},
	description: {
		width: '60%',
		textAlign: 'right',
		borderRightColor: quoteLinesFooterBorderColor,
		borderRightWidth: 1,
		paddingRight: '2',
	},
	erectTotal: {
		width: '20%',
		textAlign: 'center',
		paddingRight: '8',
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
		borderRightColor: quoteLinesFooterBorderColor,
		borderRightWidth: 1,
	},
	quantity: {
		width: '20%',
		textAlign: 'left',
		paddingLeft: 8,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
		borderRightColor: quoteLinesFooterBorderColor,
		borderRightWidth: 1,
	},
	weeklyTotal: {
		width: '20%',
		textAlign: 'left',
		// paddingRight: "8",
		paddingLeft: 31,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
		borderRightColor: quoteLinesFooterBorderColor,
		// borderRightWidth: 1,
	},
	total: {
		width: '15%',
		textAlign: 'right',
		paddingLeft: 8,
		paddingRight: 3,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
	},
})

const AddOnsBorderColor = '#F3F4F6'

export const AddOnsRow = StyleSheet.create({
	row: {
		flexGrow: 1,
		flexDirection: 'row',
		borderBottomColor: '#F3F4F6',
		borderBottomWidth: 1,
		fontFamily: 'Open Sans',
		fontSize: 7.4,
	},
	type: {
		fontWeight: 600,
	},
	description: {
		textWrap: 'nowrap',
		textOverflow: 'ellipsis',
		flexDirection: 'column',
		textAlign: 'left',
		width: '82.9%',
		borderRightColor: AddOnsBorderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
		paddingRight: 3,
	},
	additionalDuration: {
		width: '18.3%',
		borderRightColor: AddOnsBorderColor,
		borderRightWidth: 1,
		textAlign: 'center',
		paddingLeft: 8,
		paddingRight: 3,
	},
	charge: {
		width: '18.3%',
		borderRightColor: AddOnsBorderColor,
		borderRightWidth: 1,
		textAlign: 'right',
		paddingLeft: 8,
		paddingRight: 3,
	},
	weekly: {
		width: '18.3%',
		borderRightColor: AddOnsBorderColor,
		borderRightWidth: 1,
		textAlign: 'right',
		paddingLeft: 8,
		paddingRight: 3,
	},
	additionalTotal: {
		width: '12.6%',
		textAlign: 'center',
		paddingLeft: 15,
		// paddingRight: 0,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
	},
})

const AddOnsFooterBorderColor = '#E5E7EB'

export const AddOnsFooterStyles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 13,
		fontFamily: 'Open Sans',
		fontSize: 7.4,
		fontWeight: 'semibold',
		color: '#1F2937',
	},
	description: {
		width: '85%',
		textAlign: 'right',
		borderRightColor: AddOnsFooterBorderColor,
		borderRightWidth: 1,
		paddingRight: 8,
	},
	quantityTotal: {
		width: '18.3%',
		textAlign: 'right',
		paddingRight: 8,
		paddingLeft: 8,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
		borderRightColor: AddOnsFooterBorderColor,
		borderRightWidth: 1,
	},
	fixedTotal: {
		width: '18.3%',
		textAlign: 'right',
		paddingLeft: 8,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
		paddingRight: 3,
		borderRightColor: AddOnsFooterBorderColor,
		borderRightWidth: 1,
	},
	weeklyTotal: {
		width: '18.3%',
		textAlign: 'right',
		paddingLeft: 8,
		paddingRight: 3,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
		borderRightColor: AddOnsFooterBorderColor,
		borderRightWidth: 1,
	},
	total: {
		width: '12.6%',
		textAlign: 'center',
		paddingLeft: 15,
		// paddingRight: 0,
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
	},
})
