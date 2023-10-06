import React from 'react'
import { IStaffRow } from 'models/staff.model'
import { CreateFile } from 'common'

interface Props {
	values: IStaffRow
	setFieldValue: (field: string, value: string) => void
}

export const ScaffoldCertificate: React.FC<Props> = ({
	values,
	setFieldValue,
}) => {
	return (
		//
		<div>
			<h3 className="px-4 py-2 text-lg font-semibold leading-5">
				Scaffold Certificate
			</h3>
			<div className="px-2">
				<h4 className="text-md font-normal leading-5 px-4">Photo</h4>
				<CreateFile
					field="scaffold_certificate_photo"
					setFieldValue={setFieldValue}
					value={values.scaffold_certificate_photo}
				/>
			</div>
		</div>
	)
}
