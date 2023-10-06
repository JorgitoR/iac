import { IQuoteZones } from 'models'

const initZone: IQuoteZones = {
	id: null,
	zone_id: '',
	zone_label: '',
}

const addNewZone = (
	zone_id: number,
	zones: IQuoteZones[],
	setFieldValue: (field: string, value: IQuoteZones[]) => void
) => {
	const newzones = zones
	zones.push({ ...initZone, zone_id })
	setFieldValue('zones', newzones)
}

const removezone = (
	index: number,
	zones: IQuoteZones[],
	setFieldValue: (field: string, value: IQuoteZones[]) => void
) => {
	const newzones = zones
	newzones.splice(index, 1)
	setFieldValue('zones', newzones)
}

const updateZone = (
	index: number,
	zones: IQuoteZones[],
	setFieldValue: (field: string, value: IQuoteZones[]) => void,
	field: string,
	value: string | number
) => {
	const newzones = zones.map((zone, i) => {
		if (i === index) {
			return {
				...zone,
				[field]: value,
			}
		}
		return zone
	})
	setFieldValue('zones', newzones)
}

const checkZones = (
	max_zones: number,
	zones: IQuoteZones[],
	setFieldValue: (field: string, value: IQuoteZones[]) => void
) => {
	if (max_zones > zones.length) {
		for (let i = zones.length; i < max_zones; i++) {
			addNewZone(i + 1, zones, setFieldValue)
		}
	} else if (max_zones < zones.length) {
		for (let i = zones.length; i > max_zones; i--) {
			zonesFn.removezone(i - 1, zones, setFieldValue)
		}
	}

	setFieldValue('zones', zones)
}

export const zonesFn = {
	addNewZone,
	removezone,
	updateZone,
	checkZones,
}
