import { RatesForm } from './Rates'
import { IRates, IRatesHandlers } from 'models'
import { Button } from 'common'
import { QuoteServices } from 'services'
interface RatesFormProps {
	rates: IRates[]
	ratesHandlers: IRatesHandlers
}

export const RatesAdmin = ({ rates, ratesHandlers }: RatesFormProps) => {
	const { upsertRates } = QuoteServices.useServiceRates()
	return (
		<>
			<RatesForm rates={rates} ratesHandlers={ratesHandlers} />
			<br />
			<Button
				size="sm"
				variant="approve"
				className="w-full"
				onClick={() => upsertRates(rates)}>
				Save Rates
			</Button>
		</>
	)
}
