import { Document, Page, Text, View } from '@react-pdf/renderer'
import { QuoteData, IQuoteLine, IQuoteAdditionalLines } from 'models'
import { styles } from './Styles'
import { Heading, ClientInfo } from './Heading'
import { Description } from './Description'
import { ColumnTypes, Table } from './Table'

interface QuotePDFDocumentProps {
	quote_data: QuoteData
	quote_lines: IQuoteLine[]
	quote_addons: IQuoteAdditionalLines[]
}

export const QuotePDFDocument = ({
	quote_data,
	quote_lines,
	quote_addons,
}: QuotePDFDocumentProps) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<Heading />
				<Text style={styles.quoteText}>Quotation</Text>
				<ClientInfo quote={quote_data} />
				<Description description={quote_data.scope_of_work} />
				<View>
					<Text style={styles.heading}>Quote Lines</Text>
					<Table type={ColumnTypes.quote_lines} data={quote_lines} />
				</View>
				<View>
					<Text style={styles.heading}>Additional Items</Text>
					<Table type={ColumnTypes.quote_addons} data={quote_addons} />
				</View>

				<Text style={styles.subTextBoldRed}>All prices exclude GST</Text>

				<Text style={styles.subTextBold}>
					*Hire charges start on the date on which the erection of the
					scaffolding is completed and continue until the date of dismantling of
					the scaffolding as advised by the client (off-hire date). Both dates
					will be charged as whole days.
				</Text>

				<Text style={{ ...styles.subTextMargin, marginLeft: 4 }}>
					Alterations or extra work will be charged at $90.00 plus GST/hour/man
					plus hire charges for additional scaffolding material. Extra work
					includes but is not limited to all modifications, moves, repairs,
					partly dismantling or adjustments of the scaffolding.
				</Text>

				<View>
					<Text style={styles.heading}>Additional Conditions</Text>
					<Text style={{ ...styles.subTextMargin, marginLeft: 4 }}>
						{quote_data.terms}
					</Text>
				</View>
			</Page>
		</Document>
	)
}
