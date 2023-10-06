import React from 'react'
import { Dropdown, DateSelect } from 'common'
import { IStaffRow } from 'models/staff.model'
import { CreateFile } from 'common'

interface Props {
	values: IStaffRow
	staff?: IStaffRow[] | undefined
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
	setFieldValue: (field: string, value: string) => void
	setFieldTouched: (
		field: string,
		touched?: boolean,
		shouldValidate?: boolean
	) => void
}

export const FirstAid: React.FC<Props> = ({
	values,
	staff,
	setFieldValue,
	setFieldTouched,
}) => {
	const renderStaffList = () => {
		if (staff && staff?.length > 0) {
			return staff.map((item) => ({
				label: item.staff_name,
				value: item.id || '',
			}))
		}
		return []
	}
	return (
		//
		<div>
			<h3 className="px-4 pt-2 text-lg font-semibold leading-5">
				First Aid Certificate
			</h3>
			<div>
				<div className="flex items-center px-2">
					<DateSelect
						title="Issue Date"
						id="first_aid_issue"
						value={values.first_aid_issue}
						onChange={(id: string, date: string) => setFieldValue(id, date)}
					/>
					<DateSelect
						title="Expiry Date"
						id="first_aid_expiry"
						value={values.first_aid_expiry}
						onChange={(id: string, date: string) => setFieldValue(id, date)}
					/>
				</div>
				<div className="w-1/2 pl-2">
					<h4 className="text-md font-normal leading-5 px-4">Photo</h4>
					<CreateFile
						field="first_aid_photo"
						setFieldValue={setFieldValue}
						value={values.first_aid_photo}
					/>
				</div>
				<div className="w-1/2 pl-2">
					<Dropdown
						label="First Aid Assessed By"
						id="firstaid_assessed_by"
						value={values.firstaid_assessed_by}
						onChangeVal="label"
						onChange={(e: string) => setFieldValue('firstaid_assessed_by', e)}
						onBlur={() => setFieldTouched('firstaid_assessed_by', true)}
						options={renderStaffList()}
					/>
				</div>
			</div>
		</div>
	)
}
