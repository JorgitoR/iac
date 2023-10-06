import { View, Text } from '@react-pdf/renderer'
import { IQuoteAdditionalLines } from 'models'
import { AddOnsFooterStyles as styles } from './styles'
import { numberFormat } from 'utilities'

interface AdditionalFooterRowProps {
	items: IQuoteAdditionalLines[]
}

export const AdditionalFooterRow = ({ items }: AdditionalFooterRowProps) => {
	const total = items
		.map((item) => item.total_cost)
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

	return (
		<View style={styles.row}>
			<Text style={styles.description}>Total</Text>
			<Text style={styles.total}>{numberFormat.format(total)}</Text>
		</View>
	)
}
