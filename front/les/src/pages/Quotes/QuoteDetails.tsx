import { Section, Spinner, TextArea, TwoColumnDetails } from 'common'
import { Table } from 'common/Table'
import { AppRoutes } from 'config'
import { useParams } from 'react-router-dom'
import { QuoteServices } from 'services'
import { numberFormat } from 'utilities'

export const QuoteDetails = () => {
	const { id } = useParams()
	const quoteId = parseInt(id || '') || undefined

	const { data: quote, isLoading: quote_loading } =
		QuoteServices.useQuoteById(quoteId)

	const { data: quote_lines, isLoading: quote_lines_loading } =
		QuoteServices.useQuoteLinesById(quoteId)

	const { data: quote_addons, isLoading: quote_addons_loading } =
		QuoteServices.useQuoteAddonsById(quoteId)

	if (quote_loading) return <Spinner />

	return (
		<div className="w-full mx-auto mt-8">
			<TwoColumnDetails
				heading="Quote Details"
				isEditable={quote.status === 'Approved' ? false : true}
				editBtn="Edit Quote"
				editLink={{
					to: AppRoutes.privateRoutes.QuotesEdit.replace(':id', id || ''),
				}}>
				<Section title="Quote #" content={quote?.quote_num} />
				<Section title="Client" content={quote?.clientData?.client_name} />
				<Section title="Quote Type" content={quote?.quote_type} />
				<Section title="Variation Job" content="" />
				<Section title="Job Type" content={quote?.job_type} />
				<Section title="Scope of Work" content={quote?.scope_of_work} />
				<Section title="Zones" content={quote?.max_zones} />
				<Section title="Street Address" content={quote?.street} />
				<Section title="Estimator" content={quote?.estimatorData?.staff_name} />
				<Section title="Status" content={quote?.status} />
			</TwoColumnDetails>

			<Table
				title="Quote Lines"
				isLoading={
					quote_lines_loading === undefined ? true : quote_lines_loading
				}
				columns={[
					{
						header: 'Zone',
						field: 'zone_id',
					},
					{ header: 'Zone Label', field: 'zone_label' },
					{ header: 'Type', field: 'type' },
					{ header: 'Description', field: 'description' },
					{ header: 'Quantity', field: 'quantity' },
					{
						header: 'Erect/Dismantle (P/U)',
						field: 'erect_and_dismantle',
						body: (row) => numberFormat.format(row.erect_and_dismantle || 0),
					},
					{
						header: 'Hire Fee (P/U)',
						field: 'weekly_hire_fee',
						body: (row) => numberFormat.format(row.weekly_hire_fee || 0),
					},
					{
						header: 'Total',
						field: 'total',
						body: (row) => numberFormat.format(row.total || 0),
					},
				]}
				data={quote_lines}
				DisableHeader
				disablePaginator
			/>

			<Table
				title="Additional Items"
				isLoading={
					quote_addons_loading === undefined ? true : quote_addons_loading
				}
				columns={[
					{ header: 'Type', field: 'type' },
					{ header: 'Description', field: 'description' },
					{ header: 'Duration / Quantity', field: 'duration_quantity' },
					{
						header: 'Fixed Charge',
						field: 'fixed_charge',
						body: (row) => numberFormat.format(row.fixed_charge || 0),
					},
					{
						header: 'Total',
						field: 'total_cost',
						body: (row) => numberFormat.format(row.total_cost || 0),
					},
				]}
				data={quote_addons}
				DisableHeader
				disablePaginator
			/>
			<br />

			<div className="pl-7">
				<h2 className="text-lg leading-6 font-medium text-gray-900">
					Additional Conditions
				</h2>
				<div className="w-6/12 card">
					<TextArea
						handleBlur={() => null}
						handleChange={() => null}
						id="additional_conditions"
						rows={10}
						disabled={true}
						value={quote?.terms || ''}
					/>
				</div>
			</div>

			<Totals quote={quote} />
		</div>
	)
}

interface totalsProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	quote: any
}

function Totals({ quote }: totalsProps) {
	return (
		<div className="w-2/5 px-6 my-12">
			<h2 className="pl-4 text-lg leading-6 font-sm uppercase text-gray-700 my-4">
				Totals
			</h2>
			<dl className="py-6 space-y-6 px-4">
				<div className="flex items-center justify-between">
					<dt className="text-sm">Total Erect and Dismantle</dt>
					<dd className="text-sm font-medium text-gray-900">
						{numberFormat.format(quote?.erectDismantleTotal)}
					</dd>
				</div>
				<div className="flex items-center justify-between">
					<dt className="text-sm">Total Additionals</dt>
					<dd className="text-sm font-medium text-gray-900">
						{numberFormat.format(quote?.additionalTotal)}
					</dd>
				</div>
				<div className="flex items-center justify-between">
					<dt className="text-sm">Total Weekly Amount</dt>
					<dd className="text-sm font-medium text-gray-900">
						{numberFormat.format(quote?.weekTotal)}
					</dd>
				</div>
				<div className="flex items-center justify-between border-t border-gray-200 pt-6">
					<dt className="text-base font-medium">Total Amount</dt>
					<dd className="text-base font-medium text-gray-900">
						{numberFormat.format(quote?.total)}
					</dd>
				</div>
			</dl>
		</div>
	)
}
