import React from 'react'
import { Dropdown, DateSelect, CreateFile } from 'common'
import { IStaffRow } from 'models/staff.model'

type HealthSafetyProps = {
	values: {
		induction_date: string
		expiry_date: string
		hs_assessed_by: string
		photo: string
	}
	staff: IStaffRow[] | undefined
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
	setFieldValue: (
		field: string,
		value: string | number | boolean | Date
	) => void
	setFieldTouched: (field: string, touched?: boolean) => void
}

export const HealthSafety: React.FC<HealthSafetyProps> = ({
	values,
	staff,
	// handleChange,
	// handleBlur,
	setFieldValue,
	setFieldTouched,
}) => {
	const renderStaffList = (): { label: string; value: string }[] => {
		if (staff && staff?.length > 0) {
			return staff.map((item) => ({
				label: item.staff_name,
				value: item.id || '',
			}))
		}
		return []
	}
	return (
		<>
			<h3 className="px-4 pt-2 text-lg font-semibold leading-5">
				Health and Safety Induction
			</h3>
			<div>
				<div className="flex items-center px-2">
					<DateSelect
						title="Induction Date"
						id="induction_date"
						value={values.induction_date}
						onChange={setFieldValue}
					/>
					<DateSelect
						title="Expiry Date"
						id="expiry_date"
						value={values.expiry_date}
						onChange={setFieldValue}
					/>
				</div>
				<div className="w-1/2 pl-2">
					<h4 className="text-md font-normal leading-5 px-2">Photo</h4>
					<CreateFile
						field="photo"
						setFieldValue={setFieldValue}
						value={values.photo}
					/>
				</div>
				<div className="w-1/2 pl-2">
					<Dropdown
						label="H&S Assessed By"
						id="hs_assessed_by"
						value={values.hs_assessed_by}
						onChangeVal="label"
						onChange={setFieldValue}
						onBlur={setFieldTouched}
						options={renderStaffList()}
					/>
				</div>
			</div>
		</>
	)
}
