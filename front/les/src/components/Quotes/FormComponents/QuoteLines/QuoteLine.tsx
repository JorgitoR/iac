import { Dropdown } from 'primereact/dropdown'
import { OptionsForDropdown, numberFormat } from 'utilities'
import {
	IQuoteLine,
	IQuoteZones,
	IRates,
	IquoteLinesHandlers,
	estimatedWay,
} from 'models'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Button } from 'primereact/button'
import { ConfirmationDialog } from 'common'
import '../customStyle.css'

interface QuoteLineProps {
	zones: IQuoteZones[]
	rates: IRates[]
	data: IQuoteLine
	quoteLinesHandlers: IquoteLinesHandlers
	index: number
	estimatedWayOption: estimatedWay
}

export const QuoteLine = ({
	zones,
	rates,
	data,
	index,
	quoteLinesHandlers,
	estimatedWayOption,
}: QuoteLineProps) => {
	const handleProductLineChange = (
		index: number,
		field: keyof IQuoteLine,
		value: string | number
	) => {
		quoteLinesHandlers.updateQuoteLine(index, field, value)
	}

	return (
		<tr>
			<td className="px-0.5 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-10">
				<Dropdown
					title="zone_id"
					options={OptionsForDropdown(zones, 'zone_id', 'zone_id')}
					id={`zone_id${data.id}`}
					value={data.zone_id}
					onChange={(e) =>
						handleProductLineChange(index, 'zone_id', e.target.value)
					}
					className="w-full custom-p-inputtext h-7 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-40">
				<input
					id={`zonelabel${data.id}`}
					type="text"
					className="h-7 text-sm rounded-md w-full border border-gray-100 text-gray-600 focus:outline-none"
					value={data.zone_label}
					disabled
				/>
			</td>
			<td className="px-0.5 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-10">
				<Dropdown
					title="Type"
					options={OptionsForDropdown(rates, 'service', 'service')}
					id={`type${data.id}`}
					value={data.type}
					onChange={(e) =>
						handleProductLineChange(index, 'type', e.target.value)
					}
					className="w-full custom-p-inputtext h-7 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
				/>
			</td>
			<td className="px-2 py-1 h-7 text-sm bg-white border border-gray-100 whitespace-nowrap w-48">
				<input
					id={`description${data.id}`}
					type="text"
					className="h-7 px-2 text-sm rounded-md  w-full border border-gray-300 text-gray-900 focus:outline-none"
					value={data.description}
					onChange={(e) =>
						handleProductLineChange(index, 'description', e.target.value)
					}
				/>
			</td>
			{estimatedWayOption === estimatedWay.SQM ? (
				<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-32">
					<input
						id={`total_dimensions${data.id}`}
						type="number"
						className="h-7 text-sm rounded-md w-full border border-gray-100 text-gray-600 focus:outline-none"
						value={data.total_dimensions}
						onChange={(e) =>
							handleProductLineChange(
								index,
								'total_dimensions',
								Number(e.target.value)
							)
						}
					/>
				</td>
			) : null}
			{estimatedWayOption !== estimatedWay.SQM ? (
				<>
					<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-24">
						<input
							id={`quantity${data.id}`}
							type="number"
							className="h-7 text-sm rounded-md  w-full border border-gray-300 text-gray-900 focus:outline-none"
							value={data.quantity}
							disabled={
								!data.type || estimatedWayOption === estimatedWay.TotalED
							}
							onChange={(e) =>
								handleProductLineChange(
									index,
									'quantity',
									Number(e.target.value)
								)
							}
						/>
					</td>
					<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-24">
						<input
							id={`total_days${data.id}`}
							type="number"
							className="h-7 text-sm rounded-md  w-full border border-gray-300 text-gray-900 focus:outline-none"
							value={data.total_days}
							disabled
							onChange={(e) =>
								handleProductLineChange(index, 'total_days', e.target.value)
							}
						/>
					</td>
				</>
			) : null}
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-32">
				${' '}
				<input
					id={`erect_and_dismantle${data.id}`}
					type="text"
					className="h-7 px-2 text-sm rounded-md w-full border border-gray-100 text-gray-600 focus:outline-none"
					value={Number(data.erect_and_dismantle)}
					onChange={(e) =>
						handleProductLineChange(
							index,
							'erect_and_dismantle',
							parseFloat(e.target.value.replace(/[^\d.-]/g, '')) || 0
						)
					}
					disabled={estimatedWayOption === estimatedWay.Hours}
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-32">
				<input
					id={`percentageWeeklyHireFee${data.id}`}
					type="number"
					className="h-7 px-2 text-sm rounded-md w-full border border-gray-100 text-gray-600 focus:outline-none"
					value={data.percentage_weekly_hire_fee}
					onChange={(e) =>
						handleProductLineChange(
							index,
							'percentage_weekly_hire_fee',
							e.target.value
						)
					}
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-32">
				<input
					id={`weekly_hire_fee${data.id}`}
					type="text"
					className="h-7 px-2 text-sm rounded-md w-full border border-gray-100 text-gray-600 focus:outline-none"
					value={numberFormat.format(Number(data.weekly_hire_fee))}
					onChange={(e) =>
						handleProductLineChange(index, 'weekly_hire_fee', e.target.value)
					}
					disabled
				/>
			</td>
			<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap w-32">
				<input
					id={`total${data.id}`}
					type="text"
					className="h-7 px-2 text-sm rounded-md w-full border border-gray-100 text-gray-500 focus:outline-none"
					value={numberFormat.format(Number(data.total))}
					disabled
				/>
			</td>
			<td className="px-2 py-1 text-tiny bg-white border border-gray-100 whitespace-nowrap w-8">
				<ConfirmationDialog
					icon="danger"
					title="Delete Line Item"
					body="Are you sure you want to delete this item? This action is unrecoverable!"
					triggerButton={
						<button type="button">
							<XCircleIcon
								className="flex-shrink-0 h-4 w-4 text-red-500"
								aria-hidden="true"
							/>
						</button>
					}
					confirmButton={
						<Button
							className="bg-red-600 text-white"
							onClick={async () => quoteLinesHandlers.removeQuoteLine(index)}>
							Delete Line
						</Button>
					}
				/>
			</td>
		</tr>
	)
}
