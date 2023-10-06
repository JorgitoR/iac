import { RadioButton } from 'primereact/radiobutton'
import { estimatedWay, estimatedWayOptions } from 'models'

interface EstimaderWaySelectorProps {
	estimatedWayVal: estimatedWay | null
	setFieldValue: (field: string, value: string | number) => void
}

export const EstimaderWaySelector = ({
	estimatedWayVal,
	setFieldValue,
}: EstimaderWaySelectorProps) => {
	return (
		<>
			<h3 className="block text-sm font-medium text-gray-700 w-1/2 ml-2 mt-1">
				How will this job be estimated?
			</h3>
			<div className="w-1/2 ml-3 mt-1 grid grid-cols-2 gap-2">
				{estimatedWayOptions.map((option) => (
					<div key={option}>
						<RadioButton
							inputId={`howestimate${option}`}
							name="howestimate"
							value={option}
							onChange={(e) => {
								setFieldValue('estimatedWay', e.target.value)
							}}
							checked={estimatedWayVal === option}
						/>
						<label
							htmlFor={`howestimate${option}`}
							className="p-radiobutton-label ml-1">
							{option}
						</label>
					</div>
				))}
			</div>
		</>
	)
}
