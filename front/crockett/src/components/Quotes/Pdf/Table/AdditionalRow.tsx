import { View, Text } from '@react-pdf/renderer'
import { IQuoteAdditionalLines } from 'models'
import { AddOnsRow as styles } from './styles'
import { numberFormat } from 'utilities'

interface AdditionalRowProps {
	items: IQuoteAdditionalLines[]
}

export const AdditionalRow = ({ items }: AdditionalRowProps) => {
	const rows = items.map((item, index) => {
		const description = []
		if (item.type) description.push(item.type)
		if (item.description) description.push(item.description)

		return (
			<View key={index} style={styles.row}>
				<View style={styles.description}>
					{item.type ? <Text style={styles.type}>{item.type}</Text> : null}
				</View>
				<Text style={styles.additionalTotal}>
					{numberFormat.format(item.total_cost)}
				</Text>
			</View>
		)
	})

	return <>{rows}</>
}
