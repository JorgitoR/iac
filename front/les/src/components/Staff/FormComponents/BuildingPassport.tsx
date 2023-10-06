import { IStaffRow } from 'models/staff.model'
import { Input, DateSelect, Dropdown, CreateFile } from 'common'
interface BuildingPassportProps {
	values: IStaffRow
	staff: IStaffRow[] | undefined
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
	setFieldValue: (field: string, value: unknown) => void
	setFieldTouched: (
		field: string,
		touched?: boolean,
		shouldValidate?: boolean
	) => void
}

export function BuildingPassport({
	values,
	staff,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
}: BuildingPassportProps) {
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
		<div>
			<h3 className="px-4 pt-2 text-lg font-semibold leading-5">
				High Risk Work Licence
			</h3>
			<div>
				<div className="flex items-center px-2">
					<Input
						title="Passport Number"
						id="passport_num"
						type="text"
						handleChange={handleChange}
						handleBlur={handleBlur}
						value={values.passport_num}
						placeholder="Passport Number"
					/>
					<Input
						title="Type"
						id="passport_type"
						type="text"
						handleChange={handleChange}
						handleBlur={handleBlur}
						value={values.passport_type}
						placeholder="Type"
					/>
				</div>
				<div className="flex items-center px-2">
					<DateSelect
						title="Issue Date"
						id="passport_issue"
						value={values.passport_issue}
						onChange={(id: string, date: string) => setFieldValue(id, date)}
					/>
					<DateSelect
						title="Expiry Date"
						id="passport_expiry"
						value={values.passport_expiry}
						onChange={(id: string, date: string) => setFieldValue(id, date)}
					/>
				</div>
				<div className="w-1/2 pl-2">
					<h4 className="text-md font-normal leading-5 px-4">Photo</h4>
					<CreateFile
						field="passport_photo"
						setFieldValue={setFieldValue}
						value={values.passport_photo}
					/>
				</div>
				<div className="w-1/2 pl-2">
					<Dropdown
						label="Site Safe Assessed By"
						id="site_safe_assessed_by"
						value={values.site_safe_assessed_by}
						onChangeVal="label"
						onChange={(id: string, value: string) =>
							setFieldValue('site_safe_assessed_by', value)
						}
						onBlur={() => setFieldTouched('site_safe_assessed_by')}
						options={renderStaffList()}
					/>
				</div>
			</div>
		</div>
	)
}
