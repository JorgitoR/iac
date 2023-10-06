import { IRates, IRatesHandlers } from 'models'
import { Button } from 'common'

interface RatesFormProps {
	rates: IRates[]
	ratesHandlers: IRatesHandlers
}

export const RatesForm = ({ rates, ratesHandlers }: RatesFormProps) => {
	return (
		<>
			<div className="w-full">
				<table className="w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="text-center border border-gray-200 px-1 py-2 text-tiny font-medium text-blue-900 uppercase tracking-wider text-2xs">
								Service
							</th>
							<th className="text-center border border-gray-200 px-1 py-2 text-tiny font-medium text-blue-900 uppercase tracking-wider text-2xs">
								Fee
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{rates.map((rate, index) => (
							<tr key={index}>
								<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap">
									<input
										id={`service${rate?.id}`}
										type="text"
										defaultValue={rate?.service}
										className="h-7 rounded-md w-full border border-gray-300 text-gray-900 focus:outline-none px-2"
										name="service"
										onChange={(e) =>
											ratesHandlers.updateRate(index, 'service', e.target.value)
										}
									/>
								</td>
								<td className="px-2 py-1 text-sm bg-white border border-gray-100 whitespace-nowrap">
									<input
										id={`fee${rate?.id}`}
										type="number"
										defaultValue={rate?.fee}
										className="h-7 rounded-md w-full border border-gray-300 text-gray-900 focus:outline-none px-2"
										name="fee"
										onChange={(e) =>
											ratesHandlers.updateRate(
												index,
												'fee',
												Number(e.target.value)
											)
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<br />
				<Button
					size="sm"
					variant="primary"
					className="w-full"
					onClick={() => ratesHandlers.addNewRate()}>
					Add new rate
				</Button>
			</div>
		</>
	)
}
