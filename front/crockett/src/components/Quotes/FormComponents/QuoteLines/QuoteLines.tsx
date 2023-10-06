import {
	IQuoteLine,
	IQuoteZones,
	IRates,
	IquoteLinesHandlers,
	columnsQuoteLines,
	estimatedWay,
} from 'models'
import { QuoteLine } from './QuoteLine'
import { PlusIcon } from '@heroicons/react/24/solid'

interface QuoteLinesProps {
	rates: IRates[]
	zones: IQuoteZones[]
	quoteLines: IQuoteLine[]
	quoteLinesHandlers: IquoteLinesHandlers
	estimatedWayOption: estimatedWay
}

export const QuoteLinesForm = ({
	rates,
	zones,
	quoteLines,
	quoteLinesHandlers,
	estimatedWayOption,
}: QuoteLinesProps) => {
	return (
		<>
			<div className="w-full px-2">
				<h2 className="text-lg leading-6 font-sm uppercase text-gray-700 my-4">
					Scaffolding, Propping & Optional Extras
				</h2>
				<table className="w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							{quoteLinesHandlers
								.validateQuoteLinesColumns(
									columnsQuoteLines,
									estimatedWayOption
								)
								.map((column) => (
									<th
										className="text-center border border-gray-200 px-1 py-2 text-tiny font-medium text-blue-900 uppercase tracking-wider text-2xs"
										key={column.key}>
										{column.title}
									</th>
								))}
							{/* Additional Column to add de the delete line button */}
							<th className="text-center border border-gray-200 px-1 py-2 text-tiny font-medium text-blue-900 uppercase tracking-wider text-2xs"></th>
						</tr>
					</thead>
					<tbody>
						{quoteLines.map((quoteLine: IQuoteLine, index: number) => (
							<QuoteLine
								key={quoteLine.id}
								zones={zones}
								rates={rates}
								data={quoteLine}
								index={index}
								quoteLinesHandlers={quoteLinesHandlers}
								estimatedWayOption={estimatedWayOption}
							/>
						))}
					</tbody>
				</table>
				<div className="mt-6 mb-16">
					<button
						type="button"
						className="flex items-center"
						onClick={() => quoteLinesHandlers.addNewQuoteLine()}>
						<PlusIcon
							className="flex-shrink-0 h-5 w-5 text-green-500"
							aria-hidden="true"
						/>
						<span className="ml-2 text-sm">Add Item</span>
					</button>
				</div>
			</div>
		</>
	)
}
