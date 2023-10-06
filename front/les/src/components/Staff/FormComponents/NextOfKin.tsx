import React from 'react'
import { Input } from 'common'
import { IStaffRow } from 'models/staff.model'

interface Props {
	values: IStaffRow
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const NextOfKin: React.FC<Props> = ({
	values,
	handleBlur,
	handleChange,
}) => {
	return (
		//
		<div>
			<h3 className="px-4 pt-2 text-lg font-semibold leading-5">Next Of Kin</h3>
			<div className="px-2">
				<div className="flex items-center">
					<div className="w-1/2">
						<Input
							title="Name"
							id="next_of_kin_name"
							type="text"
							handleChange={handleChange}
							handleBlur={handleBlur}
							value={values.next_of_kin_name}
							placeholder="Name"
						/>
					</div>
					<div className="w-1/2">
						<Input
							title="Phone"
							id="next_of_kin_phone"
							type="text"
							handleChange={handleChange}
							handleBlur={handleBlur}
							value={values.next_of_kin_phone}
							placeholder="Phone"
						/>
					</div>
				</div>
				<div className="w-1/2">
					<Input
						title="Email"
						id="next_of_kin_email"
						type="text"
						handleChange={handleChange}
						handleBlur={handleBlur}
						value={values.next_of_kin_email}
						placeholder="Email"
					/>
				</div>
			</div>
		</div>
	)
}
