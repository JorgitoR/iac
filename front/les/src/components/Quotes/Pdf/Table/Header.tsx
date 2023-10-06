import { Text, View } from '@react-pdf/renderer'

import { headerStyles as styles } from './styles'

//q: styles is an object with keys of type keyof typeof styles, which is a string.  What is the type of styles?  What is the type of styles[keyof typeof styles]?

interface HeaderProps {
	columns: {
		id: string
		heading: string
	}[]
}

export const Header = ({ columns }: HeaderProps) => (
	<View style={styles.container}>
		{columns.map((column) => (
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			<Text key={column.id} style={styles[column?.id]}>
				{column.heading}
			</Text>
		))}
	</View>
)
