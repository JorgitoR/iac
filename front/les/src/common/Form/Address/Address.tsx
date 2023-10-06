type AddressProps = {
	streetId: string
	streetId2: string
	cityId: string
	postalId: string
	streetVal: string
	street_2Val: string
	cityVal: string
	postalVal: string
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

export function Address({
	streetId,
	streetId2,
	cityId,
	postalId,
	streetVal,
	street_2Val,
	cityVal,
	postalVal,
	handleChange,
	handleBlur,
}: AddressProps) {
	return (
		<div className="px-4 py-4 mt-10 sm:mt-0">
			<div className="md:grid md:grid-cols-6 md:gap-6">
				<div className="col-span-3">
					<label
						htmlFor={streetId}
						className="block text-sm font-medium text-gray-700">
						Street address
					</label>
					<input
						type="text"
						name={streetId}
						id={streetId}
						autoComplete="street-address"
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm"
						onChange={handleChange}
						onBlur={handleBlur}
						value={streetVal}
					/>
				</div>
				<div className="col-span-3">
					<label
						htmlFor={streetId2}
						className="block text-sm font-medium text-gray-700">
						Street 2
					</label>
					<input
						type="text"
						name={streetId2}
						id={streetId2}
						autoComplete="street-address"
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm"
						onChange={handleChange}
						onBlur={handleBlur}
						value={street_2Val}
					/>
				</div>

				<div className="col-span-3">
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-700">
						City
					</label>
					<input
						type="text"
						name={cityId}
						id={cityId}
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm"
						onChange={handleChange}
						onBlur={handleBlur}
						value={cityVal}
					/>
				</div>
				<div className="col-span-3">
					<label
						htmlFor="postal-code"
						className="block text-sm font-medium text-gray-700">
						Postal Code
					</label>
					<input
						type="text"
						name={postalId}
						id={postalId}
						autoComplete="postal-code"
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm"
						onChange={handleChange}
						onBlur={handleBlur}
						value={postalVal}
					/>
				</div>
			</div>
		</div>
	)
}
