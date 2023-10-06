import { pdf } from '@react-pdf/renderer'
import { QuoteData, IQuoteLine, IQuoteAdditionalLines } from 'models'
import { QuotePDFDocument } from './Output'

interface QuotePDFBlodProps {
	quote_data: QuoteData
	quote_lines: IQuoteLine[]
	quote_addons: IQuoteAdditionalLines[]
}

export const MakeBlodQuote = async ({
	quote_data,
	quote_lines,
	quote_addons,
}: QuotePDFBlodProps) => {
	const newBlod = await pdf(
		QuotePDFDocument({ quote_data, quote_lines, quote_addons })
	).toBlob()

	return newBlod
}
