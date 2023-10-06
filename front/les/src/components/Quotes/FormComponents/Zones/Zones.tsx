import { Input } from 'common'
import { IQuoteZones, IZonesHandlers } from 'models'

interface ZonesFormProps {
	zones: IQuoteZones[]
	zonesHandlers: IZonesHandlers
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: any
	// for errors use FormikErrors<IQuoteForm>
}

export const ZonesForm = ({ zones, zonesHandlers, errors }: ZonesFormProps) => {
	return (
		<>
			<div className="grid grid-cols-2">
				{zones.map((zone, index) => (
					<div className="flex items-center" key={index}>
						<Input
							id={`${index + 1}`}
							title={`Zone ${index + 1}`}
							labelInline
							placeholder={`Zone ${index + 1}`}
							handleBlur={() => null}
							type="text"
							value={zone.zone_label}
							error={errors.zones?.[index]?.zone_label}
							handleChange={(e) =>
								zonesHandlers?.updateZone(index, 'zone_label', e.target.value)
							}
						/>
					</div>
				))}
			</div>
		</>
	)
}
