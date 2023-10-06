import { MakeBlodQuote } from 'components/Quotes/Pdf/MakeBlod'
import { QuoteServices } from 'services'
import { useFileUpload } from 'services/api'
export const useUploadQuote = () => {
	const { fetchQuoteById } = QuoteServices.useQuoteById()
	const { fetchQuoteLinesById } = QuoteServices.useQuoteLinesById()
	const { fetchQuoteAddOnsById } = QuoteServices.useQuoteAddonsById()
	const { uploadFile } = useFileUpload()

	const uploadQuote = async (quote_id: number) => {
		if (!quote_id) {
			return
		}
		if (
			fetchQuoteById !== undefined &&
			fetchQuoteLinesById !== undefined &&
			fetchQuoteAddOnsById !== undefined
		) {
			const quote_data = await fetchQuoteById(quote_id)
			const quote_lines = await fetchQuoteLinesById(quote_id)
			const quote_addons = await fetchQuoteAddOnsById(quote_id)
			const blod = await MakeBlodQuote({
				quote_data,
				quote_lines,
				quote_addons,
			})
			const file = new File([blod], 'quote.pdf')
			const resultUpload = await uploadFile(file, 'quote.pdf')

			return resultUpload?.data?.url
		}
	}

	return { uploadQuote }
}
