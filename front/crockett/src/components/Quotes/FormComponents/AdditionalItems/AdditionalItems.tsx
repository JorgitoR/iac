import { PlusIcon } from '@heroicons/react/24/solid'
import {
	IQuoteAdditionalLines,
	IRates,
	IquoteAdditionalLinesHandlers,
	columnsQuoteAdditionalLines,
} from 'models'
import { QuoteAdditionalLine } from './AdditionalLine'

interface QuoteAdditionalLinesProps {
	rates: IRates[]
	additionalLines: IQuoteAdditionalLines[]
	additionalLinesHandlers: IquoteAdditionalLinesHandlers
}

export const QuoteAdditionalLines = ({
	rates,
	additionalLines,
	additionalLinesHandlers,
}: QuoteAdditionalLinesProps) => {
	return (
		<>
			<div className="w-4/5 mb-8 px-2">
				<h2 className="text-lg leading-6 font-sm uppercase text-gray-700 my-4">
					Additional Items
				</h2>
				<table className="w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							{columnsQuoteAdditionalLines.map((column, index) => (
								<th
									key={index}
									className="text-center border border-gray-200 px-1 py-2 text-tiny font-medium text-blue-900 uppercase tracking-wider text-2xs">
									{column}
								</th>
							))}
							{/* Additional column to delete button */}
							<th></th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{additionalLines.map((line, index) => (
							<QuoteAdditionalLine
								rates={rates}
								key={index}
								line={line}
								additionalLineHandlers={additionalLinesHandlers}
								index={index}
							/>
						))}
					</tbody>
				</table>
				<div className="mt-6 mb-16">
					<button
						type="button"
						className="flex items-center"
						onClick={() => additionalLinesHandlers.addNewQuoteAdditionalLine()}>
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
