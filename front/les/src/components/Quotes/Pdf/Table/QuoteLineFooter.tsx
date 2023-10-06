import { Text, View } from '@react-pdf/renderer'
import { numberFormat } from 'utilities'
import { QuoteLinesFoorter as styles } from './styles'
import { IQuoteLine } from 'models'

interface FooterProps {
	items: IQuoteLine[]
}

export const FooterQuoteLines = ({ items }: FooterProps) => {
	// Calculate totals
	const erect = items
		.map((item) => Number(item.erect_and_dismantle))
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

	const weekFee = items
		.map((item) => Number(item.weekly_hire_fee))
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

	return (
		<View style={styles.row}>
			<Text style={styles.description}>Total</Text>
			<Text style={styles.erectTotal}>{numberFormat.format(erect)}</Text>
			<Text style={styles.weeklyTotal}>{numberFormat.format(weekFee)}</Text>
		</View>
	)
}
