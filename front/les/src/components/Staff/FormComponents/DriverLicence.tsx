import React from 'react'
import { Input, Dropdown, DateSelect, Checkbox, CreateFile } from 'common'
import { IStaffRow } from 'models/staff.model'
interface DriverLicenceProps {
	values: IStaffRow
	staff?: IStaffRow[]
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
	setFieldValue: (
		field: string,
		value: unknown,
		shouldValidate?: boolean | undefined
	) => void
	setFieldTouched: (
		field: string,
		isTouched?: boolean | undefined,
		shouldValidate?: boolean | undefined
	) => void
}

const licenceOptions = [
	{ value: 'Full', label: 'Full' },
	{ value: 'Restricted', label: 'Restricted' },
	{ value: 'Learner Licence', label: 'Learner Licence' },
	{ value: 'International', label: 'International' },
]

const classOptions = [
	{ value: 'Class 2', label: 'Class 2' },
	{ value: 'Class 4', label: 'Class 4' },
	{ value: 'Class 5', label: 'Class 5' },
]

export const DriverLicence: React.FC<DriverLicenceProps> = ({
	values,
	staff,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
}) => {
	const renderStaffList = () => {
		if (staff && staff?.length > 0) {
			return staff.map((item) => ({
				value: item.id || '',
				label: item.staff_name,
			}))
		}
		return []
	}
	return (
		<div>
			<h3 className="px-4 pt-2 text-lg font-semibold leading-5">
				Driver Licence
			</h3>
			<div className="flex items-center px-2">
				<Input
					title="Driver Licence Number"
					id="driver_licence"
					type="text"
					handleChange={handleChange}
					handleBlur={handleBlur}
					value={values.driver_licence}
					placeholder="Driver Licence Number"
				/>
				<Dropdown
					label="Driver Licence Type"
					id="licence_type"
					options={licenceOptions}
					value={values.licence_type}
					onChange={setFieldValue}
					onBlur={setFieldTouched}
				/>
			</div>
			<Checkbox
				title="Driver Licence Class"
				options={classOptions}
				id="licence_class2"
				values={JSON.parse(values.licence_class2)}
				onChange={(id: string, values: string[]) => {
					setFieldValue(id, JSON.stringify(values))
				}}
			/>
			<div className="flex items-center px-2">
				<Input
					title="Endorsement"
					id="endorsement"
					type="text"
					handleChange={handleChange}
					handleBlur={handleBlur}
					value={values.endorsement}
					placeholder=""
				/>
				<DateSelect
					title="Completion Date"
					id="endorsement_complete_date"
					value={`${values.endorsement_complete_date}`}
					onChange={setFieldValue}
				/>
				<DateSelect
					title="Expiry"
					id="endorsement_expiry"
					value={`${values.endorsement_expiry}`}
					onChange={setFieldValue}
				/>
			</div>
			<div className="flex items-center">
				<div className="w-1/2 px-2">
					<h4 className="text-md font-normal leading-5 px-4">Photo - Front</h4>
					<CreateFile
						field="photo_front"
						setFieldValue={setFieldValue}
						value={values.photo_front}
					/>
				</div>
				<div className="w-1/2">
					<h4 className="text-md font-normal leading-5 px-4">Photo - Back</h4>
					<CreateFile
						field="photo_back"
						setFieldValue={setFieldValue}
						value={values.photo_back}
					/>
				</div>
			</div>
			<div className="w-1/2 px-2">
				<Dropdown
					label="Driver Licence Assessed By"
					id="licence_assessed_by"
					value={values.licence_assessed_by}
					onChangeVal="licence_assessed_by"
					onChange={setFieldValue}
					onBlur={setFieldTouched}
					options={renderStaffList()}
				/>
			</div>
		</div>
	)
}
