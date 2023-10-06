import { Text, View } from '@react-pdf/renderer'
import { QuoteData } from 'models'
import { stylesClientInfo as styles } from './styles'
import moment from 'moment'

interface ClientInfoProps {
	quote: QuoteData
}

export const ClientInfo = ({ quote }: ClientInfoProps) => {
	const client = quote?.clientData?.client_name

	const street1 = quote?.street
	const street2 = quote?.street2
	const city = quote?.city
	const postCode = quote?.postal
	return (
		<View style={styles.headingContainer}>
			<View style={styles.clientContainer}>
				<View style={styles.headingContact}>
					<View style={styles.headingDisplay}>
						<Text style={styles.headingText}>Client:</Text>
						<Text style={styles.subText}>{client || ' '}</Text>
					</View>
					<View style={styles.headingDisplay}>
						<Text style={styles.headingText}>Site: </Text>
						<View>
							<View>
								{street1 ? (
									<Text style={styles.subText}>{street1},</Text>
								) : null}
							</View>
							<View>
								{street2 ? (
									<Text style={styles.subText}>{street2},</Text>
								) : null}
							</View>
							<View>
								{city ? <Text style={styles.subText}>{city}</Text> : null}
							</View>
							<View>
								{postCode ? (
									<Text style={styles.subText}>{postCode}</Text>
								) : null}
							</View>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.headingContact}>
				<View style={styles.headingDisplay}>
					<Text style={styles.headingText}>Date:</Text>
					<Text style={styles.subText}>
						{moment(quote.created_at).format('DD/MM/YYYY')}
					</Text>
				</View>
				<View style={styles.headingDisplay}>
					<Text style={styles.subText2}>Quotation Expires 30 days</Text>
				</View>
				<View style={styles.headingDisplay}>
					<Text style={styles.subText2}>from above date</Text>
				</View>
				<View style={styles.headingDisplay}>
					<Text style={styles.headingText}>Quote #:</Text>
					<Text style={styles.subText}>{quote?.quote_num}</Text>
				</View>
			</View>
		</View>
	)
}
