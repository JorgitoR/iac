import { Text, View } from '@react-pdf/renderer'
import { GroupStyles as styles } from './styles'

interface RowGroupProps {
	text: string
}

export const RowGroup = ({ text }: RowGroupProps) => (
	<View style={styles.row}>
		<Text style={styles.blankRow}>{text}</Text>
	</View>
)
