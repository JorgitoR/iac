import { useParams } from 'react-router-dom'

import { QuotesComponents } from 'components'

export const QuotesFormPage = () => {
	const { id } = useParams()

	return <QuotesComponents.Form quoteID={Number(id) || undefined} />
}
