import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
	page: {
		fontFamily: 'Helvetica',
		fontSize: 11,
		// paddingTop: 10,
		paddingBottom: 40,
		paddingLeft: 50,
		paddingRight: 50,
		lineHeight: 1.5,
		flexDirection: 'column',
	},
	heading: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: 150,
		alignItems: 'flex-start',
		fontFamily: 'Open Sans',
		fontWeight: 'semibold',
		fontSize: 9,
		color: '#1A8140',
		marginTop: 8,
	},
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headingContact: {
		textAlign: 'right',
		marginTop: 20,
	},
	headingDisplay: {
		display: 'flex',
		flexDirection: 'row',
	},
	headingText: {
		fontFamily: 'Open Sans',
		fontWeight: 'semibold',
		fontSize: 7,
	},
	quoteText: {
		fontFamily: 'Open Sans',
		fontWeight: 'bold',
		fontSize: 18,
	},

	subText: {
		fontFamily: 'Open Sans',
		fontSize: 7,
		textAlign: 'justify',
		// fontWeight: "semibold",
	},
	subTextMargin: {
		fontFamily: 'Open Sans',
		fontSize: 7,
		marginTop: 15,
		// fontWeight: "semibold",
	},
	subTextBold: {
		fontFamily: 'Open Sans',
		marginLeft: 4,
		marginTop: 15,
		fontSize: 7,
		fontWeight: 'bold',
	},
	subTextBoldRed: {
		fontFamily: 'Open Sans',
		color: 'red',
		marginLeft: 4,
		marginTop: 15,
		fontSize: 7,
		fontWeight: 'bold',
		textAlign: 'right',
	},
	logo: {
		objectFit: 'contain',
		width: '20%',
		height: 'auto',
		paddingTop: 20,
	},
	footer: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 7,
		right: 0,
	},
	pageTermsOfTrade: {
		objectFit: 'contain',
		width: '105%',
		height: 'auto',
		marginLeft: '-20',
	},
	footerLogo: {
		objectFit: 'contain',
		width: '110%',
		// height: "auto",
		marginRight: 0,
	},

	footerText: {
		fontSize: 6,
		paddingLeft: 10,
	},

	pageNumber: {
		// position: "absolute",
		marginTop: 10,
		marginRight: 17,
		// paddingLeft: 70,
		fontSize: 8,
		// bottom: 30,
		// left: 0,
		// right: 0,
		textAlign: 'center',
		color: 'grey',
	},
})
