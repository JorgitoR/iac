import { View } from '@react-pdf/renderer'
import { tableStyles as styles } from './styles'
import { ColumnTypes, columns } from './Columns'
import { Header } from './Header'
import { QuoteLinesRows } from './QuoteLinesRows'
import { AdditionalRow } from './AdditionalRow'
import { FooterQuoteLines } from './QuoteLineFooter'
import { AdditionalFooterRow } from './AdditionalFooterFooter'

interface TableProps {
	type: ColumnTypes
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any[]
}

export const Table = ({ type, data }: TableProps) => {
	const columnsarr = columns[type]

	return (
		<View style={styles.tableContainer}>
			<Header columns={columnsarr} />

			{type === ColumnTypes.quote_lines && <QuoteLinesRows items={data} />}
			{type === ColumnTypes.quote_lines && <FooterQuoteLines items={data} />}

			{type === ColumnTypes.quote_addons && <AdditionalRow items={data} />}
			{type === ColumnTypes.quote_addons && (
				<AdditionalFooterRow items={data} />
			)}
		</View>
	)
}
