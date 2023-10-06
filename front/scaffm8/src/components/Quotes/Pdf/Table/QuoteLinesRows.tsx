import { Text, View } from '@react-pdf/renderer'
import { RowGroup } from './Group'
import { QuoteLineRow as styles } from './styles'
import { numberFormat } from 'utilities'
import { IQuoteLine } from 'models'

type Item = IQuoteLine

type GroupedItems = {
	[key: string]: Item[]
}

type RowProps = {
	items: IQuoteLine[]
	groupable?: true // groupable siempre es true en esta versión
}

export const QuoteLinesRows = ({ items }: RowProps) => {
	const groupBy = function group(data: Item[], key: keyof Item) {
		return data.reduce((storage: GroupedItems, item: Item) => {
			const group = item[key]
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			storage[group] = storage[group] || []
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			storage[group].push(item)
			return storage
		}, {})
	}

	const grouped: GroupedItems = groupBy(items, 'zone_label')

	const sortedJson: GroupedItems = Object.keys(grouped)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.sort((a, b) => grouped[a][0].zone_id - grouped[b][0].zone_id)
		.reduce((accu: GroupedItems, val: string) => {
			accu[`${val}`] = grouped[val]
			return accu
		}, {})

	const rows: JSX.Element[] = Object.entries(sortedJson).map((item) => (
		<>
			<RowGroup text={item[0]} />
			{item[1].map((row, index) => (
				<View key={index} style={styles.row}>
					<Text style={styles.description}>{row.description}</Text>
					<Text style={styles.erect}>
						{`${numberFormat.format(Number(row.erect_and_dismantle))}`}
					</Text>
					<Text style={styles.weekly}>
						{`${numberFormat.format(Number(row.weekly_hire_fee))}`}
					</Text>
				</View>
			))}
		</>
	))

	return <>{rows}</>
}
