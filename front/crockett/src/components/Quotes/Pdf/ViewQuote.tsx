import { PDFViewer } from '@react-pdf/renderer'
import { QuotePDFDocument } from './Output'
import { QuoteData, IQuoteLine, IQuoteAdditionalLines } from 'models'

interface QuotePDFViewerProps {
	quote_data: QuoteData
	quote_lines: IQuoteLine[]
	quote_addons: IQuoteAdditionalLines[]
}

export const QuotePDFViewer = ({
	quote_data,
	quote_lines,
	quote_addons,
}: QuotePDFViewerProps) => {
	return (
		<>
			<PDFViewer width="100%" height="1000">
				<QuotePDFDocument
					quote_data={quote_data}
					quote_lines={quote_lines}
					quote_addons={quote_addons}
				/>
			</PDFViewer>
		</>
	)
}
