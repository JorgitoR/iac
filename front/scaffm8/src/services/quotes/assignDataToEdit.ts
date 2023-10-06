import { IQuoteForm } from 'models/quotes.model'
import {
	QuoteData,
	IQuoteLine,
	IQuoteAdditionalLines,
	IQuoteZones,
	IRates,
	estimatedWay,
} from 'models/quotes.model'

interface IAssignDataToEdit {
	quote_data: QuoteData
	quote_lines: IQuoteLine[]
	quote_addons: IQuoteAdditionalLines[]
	quote_rates: IRates[]
	quote_zones: IQuoteZones[]
}

export const assignDataToEdit = ({
	quote_data,
	quote_lines,
	quote_addons,
	quote_rates,
	quote_zones,
}: IAssignDataToEdit): IQuoteForm => {
	const newValues: IQuoteForm = {
		quote_type: quote_data?.quote_type,
		job_type: quote_data?.job_type,
		variation_job_id: quote_data?.variation_job_id,
		PO_Number: quote_data?.PO_Number || null,
		max_zones: quote_data?.max_zones,
		client: quote_data?.client,
		client_contact: quote_data?.client_contact || null,
		quote_num: quote_data?.quote_num,
		scope_of_work: quote_data?.scope_of_work,
		estimator: quote_data?.estimator,

		fullAddress: quote_data?.fullAddress,
		street: quote_data?.street,
		street2: quote_data?.street2,
		city: quote_data?.city,
		postal: quote_data?.postal,

		estimatedWay: quote_data?.estimatedWay as estimatedWay,

		quote_lines: quote_lines,

		quote_additional_lines: quote_addons,

		terms: quote_data?.terms,

		erectDismantleTotal: quote_data?.erectDismantleTotal,
		additionalTotal: quote_data?.additionalTotal,
		weekTotal: quote_data?.weekTotal,
		total: quote_data?.total,

		rates: quote_rates,
		zones: quote_zones,
	}
	return newValues
}
