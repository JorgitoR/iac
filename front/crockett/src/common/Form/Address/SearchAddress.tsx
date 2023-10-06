import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { AppConfig } from 'config'

interface AddressProps {
	streetId: string
	streetId2: string
	cityId: string
	postalId: string
	streetVal: string
	street2Val: string
	cityVal: string
	postalVal: string
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
	setFieldValue: (field: string, value: string) => void
}

export function SearchAddress({
	streetId,
	streetId2,
	cityId,
	postalId,
	streetVal,
	street2Val,
	cityVal,
	postalVal,
	handleChange,
	handleBlur,
	setFieldValue,
}: AddressProps) {
	const googleApiKey = AppConfig.GoogleMapsApiKey

	const [street, setStreet] = useState<string>('')
	const [street2, setStreet2] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [postalCode, setPostalCode] = useState<string>('')

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlePlaceSelect = (place: any) => {
		const addressComponents = place.address_components
		let street2 = ''
		let city = ''
		let postalCode = ''

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		addressComponents.forEach((component: any) => {
			const { types } = component

			if (types.includes('street_number')) {
				if (street2 === '') {
					street2 = component.long_name
				} else {
					street2 += ` ${component.long_name}`
				}
			}

			if (types.includes('route')) {
				if (street2 === '') {
					street2 = component.long_name
				} else {
					street2 += ` ${component.long_name}`
				}
			}

			if (types.includes('sublocality')) {
				if (street2 === '') {
					street2 = component.long_name
				} else {
					street2 += `, ${component.long_name}`
				}
			}

			if (types.includes('locality')) {
				if (city === '') {
					city = component.long_name
				} else {
					city += `, ${component.long_name}`
				}
				cityVal = city
			}

			if (types.includes('administrative_area_level_1')) {
				if (city === '') {
					city = component.long_name
				} else {
					city += `, ${component.long_name}`
				}
			}

			if (types.includes('postal_code')) {
				postalCode = component.long_name
			}
		})

		setStreet2(street2)
		setCity(city)
		setPostalCode(postalCode)

		setFieldValue('street2', street2)
		setFieldValue('street', place.formatted_address)
		setFieldValue('postal', postalCode)
		setFieldValue('city', city)
	}

	useEffect(() => {
		setStreet(streetVal)
		setStreet2(street2Val)
		setCity(cityVal)
		setPostalCode(postalVal)
	}, [streetVal, cityVal, street2Val, postalVal])

	return (
		<div className="px-4 py-4 mt-10 sm:mt-0">
			<div className="md:grid md:grid-cols-6 md:gap-6">
				<div className="col-span-6">
					<label
						htmlFor={streetId}
						className="block text-sm font-medium text-gray-700">
						Street address
					</label>
					<br />

					<Autocomplete
						apiKey={googleApiKey}
						placeholder=""
						style={{ width: '100%' }}
						className="autocomplete border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm pl-3"
						onPlaceSelected={(place) => {
							handlePlaceSelect(place)
						}}
						options={{
							types: ['address'],
							componentRestrictions: { country: 'nz' },
						}}
						defaultValue={street}
					/>
				</div>

				<div className="col-span-3">
					<label
						htmlFor={streetId2}
						className="block text-sm font-medium text-gray-700">
						Street
					</label>
					<input
						type="text"
						name={streetId2}
						id={streetId2}
						autoComplete="street-address"
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm pl-3"
						onChange={handleChange}
						onBlur={handleBlur}
						value={street2}
					/>
				</div>

				<div className="col-span-6 sm:col-span-6 lg:col-span-4">
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-700">
						City
					</label>
					<input
						type="text"
						name={cityId}
						id={cityId}
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm pl-3"
						onChange={handleChange}
						onBlur={handleBlur}
						value={city}
					/>
				</div>
				<div className="col-span-6 sm:col-span-2 lg:col-span-2">
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
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm block w-full border h-9 rounded-md shadow-sm pl-3"
						onChange={handleChange}
						onBlur={handleBlur}
						value={postalCode}
					/>
				</div>
			</div>
		</div>
	)
}
