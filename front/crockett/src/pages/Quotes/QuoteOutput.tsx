import { Spinner } from 'common'
import { QuotePDFViewer } from 'components/Quotes'

import { useParams } from 'react-router-dom'
import { QuoteServices } from 'services'

export const QuotePdfPage = () => {
	const { id } = useParams()
	const quoteId = parseInt(id || '') || undefined
	const { data: quote, isLoading: quote_loading } =
		QuoteServices.useQuoteById(quoteId)

	const { data: quote_lines, isLoading: quote_lines_loading } =
		QuoteServices.useQuoteLinesById(quoteId)

	const { data: quote_addons, isLoading: quote_addons_loading } =
		QuoteServices.useQuoteAddonsById(quoteId)

	if (quote_loading || quote_lines_loading || quote_addons_loading) {
		return <Spinner />
	}

	return (
		<>
			<QuotePDFViewer
				quote_data={quote}
				quote_lines={quote_lines}
				quote_addons={quote_addons}
			/>
		</>
	)
}
