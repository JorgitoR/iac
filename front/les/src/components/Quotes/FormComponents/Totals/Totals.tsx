import { numberFormat } from 'utilities'

interface TotalsProps {
	erectDismantleTotal: number | string
	weekTotal: number | string
	additionalTotal: number | string
	total: number | string
}

export const Totals = ({
	erectDismantleTotal,
	weekTotal,
	additionalTotal,
	total,
}: TotalsProps) => {
	return (
		<div className="w-6/12">
			<h2 className="pl-2 text-lg leading-6 font-sm uppercase text-gray-700 my-4">
				Totals
			</h2>
			<dl className="border-t border-gray-200 py-6 px-2 space-y-6 sm:px-6">
				<div className="flex items-center justify-between">
					<dt className="text-sm">Total Erect and Dismantle</dt>
					<dd className="text-sm font-medium text-gray-900">
						{numberFormat.format(Number(erectDismantleTotal) || 0)}
					</dd>
				</div>
				<div className="flex items-center justify-between">
					<dt className="text-sm">Total Weekly Amount</dt>
					<dd className="text-sm font-medium text-gray-900">
						{numberFormat.format(Number(weekTotal))}
					</dd>
				</div>
				<div className="flex items-center justify-between">
					<dt className="text-sm">Total Additionals</dt>
					<dd className="text-sm font-medium text-gray-900">
						{numberFormat.format(Number(additionalTotal) || 0)}
					</dd>
				</div>
				<div className="flex items-center justify-between border-t border-gray-200 pt-6">
					<dt className="text-base font-medium">Total Amount</dt>
					<dd className="text-base font-medium text-gray-900">
						{numberFormat.format(Number(total) || 0)}
					</dd>
				</div>
			</dl>
		</div>
	)
}
