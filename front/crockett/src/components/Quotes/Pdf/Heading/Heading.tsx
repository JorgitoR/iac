import { Image, Text, View } from '@react-pdf/renderer'
import { AppConfig } from 'config'
import * as logo from 'assets/logo.png'
import { stylesHeading } from './styles'

export const Heading = () => {
	return (
		<View style={stylesHeading.headingContainer}>
			<Image style={stylesHeading.logo} src={logo.default} />
			<View style={stylesHeading.headingContact}>
				<View style={stylesHeading.headingDisplay}>
					<Text style={stylesHeading.headingText}>
						{AppConfig.platformName}
					</Text>
					<Text style={stylesHeading.subText}></Text>
				</View>
			</View>
		</View>
	)
}
