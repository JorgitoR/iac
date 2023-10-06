import { XCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import {
	IQuoteAdditionalLines,
	IRates,
	IquoteAdditionalLinesHandlers,
} from 'models'
import { Dropdown } from 'primereact/dropdown'
import { OptionsForDropdown, numberFormat } from 'utilities'
import '../customStyle.css'

interface IAdditionalLineProps {
	rates: IRates[]
	line: IQuoteAdditionalLines
	additionalLineHandlers: IquoteAdditionalLinesHandlers
	index: number
}

export const QuoteAdditionalLine = ({
	rates,
	line,
	additionalLineHandlers,
	index,
}: IAdditionalLineProps) => {
	const handleProductLineChange = (
		index: number,
		field: keyof IQuoteAdditionalLines,
		value: string | number
	) => {
		additionalLineHandlers.updateQuoteAdditionalLine(index, field, value)
	}

	return (
		<tr>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-52">
				<Dropdown
					//hasLabel={false}
					options={OptionsForDropdown(rates, 'service', 'service')}
					id={`type${index}`}
					value={line.type}
					onChange={(e) => {
						handleProductLineChange(index, 'type', e.target.value)
					}}
					className="w-full custom-p-inputtext h-7 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap">
				<input
					id={`description${index}`}
					type="text"
					className="h-7 rounded-md w-full border border-gray-300 text-gray-900 focus:outline-none"
					name="description"
					value={line.description}
					onChange={(e) =>
						handleProductLineChange(index, 'description', e.target.value)
					}
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-40">
				<input
					id={`duration_quantity${index}`}
					type="number"
					className=" pl-2 h-7 rounded-md w-full border border-gray-300 text-gray-900 focus:outline-none"
					name="duration_quantity"
					value={line.duration_quantity}
					onChange={(e) =>
						handleProductLineChange(
							index,
							'duration_quantity',
							Number(e.target.value)
						)
					}
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-40">
				<input
					id={`fixed_charge${index}`}
					type="number"
					className={clsx(
						line.type ? 'border border-gray-100' : 'border border-gray-300',
						'h-7 rounded-md w-full text-gray-900 focus:outline-none pl-2'
					)}
					name="fixed_charge"
					value={line.fixed_charge}
					onChange={(e) =>
						handleProductLineChange(index, 'fixed_charge', e.target.value)
					}
					disabled={!line.type}
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-40">
				<input
					id={`totalCost${index}`}
					type="text"
					className="pl-2 h-7 rounded-md w-full border border-gray-300 text-gray-600 focus:outline-none"
					name="totalCost"
					disabled
					value={numberFormat.format(Number(line.total_cost))}
				/>
			</td>
			<td className="px-2 py-1 text-tiny bg-white border border-gray-100 whitespace-nowrap">
				<button
					type="button"
					onClick={() =>
						additionalLineHandlers.removeQuoteAdditionalLine(index)
					}>
					<XCircleIcon
						className="flex-shrink-0 h-4 w-4 text-red-500"
						aria-hidden="true"
					/>
				</button>
			</td>
		</tr>
	)
}
