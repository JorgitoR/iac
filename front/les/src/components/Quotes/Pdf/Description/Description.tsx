import { Text, View } from '@react-pdf/renderer'

import { styles } from './styles'

interface DescriptionProps {
	description: string
}

export const Description = ({ description }: DescriptionProps) => (
	<View style={styles.headerContainer}>
		<View>
			<Text style={styles.heading}>Scope of Works:</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	</View>
)
