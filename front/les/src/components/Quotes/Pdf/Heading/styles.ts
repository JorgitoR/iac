import { Font, StyleSheet } from '@react-pdf/renderer'

Font.register({
	family: 'Open Sans',
	src: 'https://fonts.gstatic.com/s/opensans/v23/mem8YaGs126MiZpBA-UFVZ0e.ttf',
})

export const stylesHeading = StyleSheet.create({
	heading: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: 150,
		alignItems: 'flex-start',
		fontFamily: 'Open Sans',
		fontWeight: 'semibold',
		color: '#1A8140',
		marginTop: 8,
	},
	headingTitle: {
		paddingTop: 15,
		fontFamily: 'Open Sans',
		fontSize: 15,
	},
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headingContact: {
		textAlign: 'left',
		marginTop: 20,
	},
	headingDisplay: {
		display: 'flex',
		flexDirection: 'row',
	},
	headingText: {
		fontFamily: 'Open Sans',
		width: '80px',
		fontSize: '8',
	},
	subText: {
		fontFamily: 'Open Sans',
		marginLeft: '4px',
		fontSize: '8',
	},
	logo: {
		objectFit: 'contain',
		width: '35%',
		height: 'auto',
		paddingTop: '15',
		paddingBottom: '15',
	},
})

export const stylesClientInfo = StyleSheet.create({
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 20,
		width: '100%',
		// fontSize: 12,
	},
	clientContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	addressContainer: {
		textAlign: 'left',
		marginTop: 20,
		paddingRight: 8,
	},
	headingContact: {
		textAlign: 'left',
		marginTop: -20,
		paddingRight: 19,
		marginRight: 18,
	},
	headingDisplay: {
		display: 'flex',
		flexDirection: 'row',
	},
	headingText: {
		fontFamily: 'Open Sans',
		fontWeight: 'semibold',
		fontSize: 9,
	},
	subText: {
		fontFamily: 'Open Sans',
		marginLeft: 4,
		fontSize: 9,
		// fontWeight: "semibold",
	},
	subText2: {
		fontFamily: 'Open Sans',
		fontSize: 6,
		color: 'red',
		// fontWeight: "semibold",
	},
	logo: {
		objectFit: 'contain',
		width: '25%',
		height: 'auto',
		paddingTop: 15,
	},
})
