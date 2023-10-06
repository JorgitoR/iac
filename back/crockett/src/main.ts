import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { MainModule } from 'modules/main.module'
import { config } from 'aws-sdk'

async function bootstrap() {
	const configDocumentation = new DocumentBuilder()
		.setTitle('Backend Server For Crockett Scaffm8 Application')
		.setDescription('Crockett Scaffm8 Backend API Documentation')
		.setVersion('1.0')
		.addTag('')
		.build()
	const app = await NestFactory.create(MainModule)
	app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' })
	const document = SwaggerModule.createDocument(app, configDocumentation)
	SwaggerModule.setup('docs', app, document)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			stopAtFirstError: true,
		})
	)
	config.update({
		region: String(process.env.AWS_S3_REGION),
	})
	await app.listen(process.env.PORT)
}
bootstrap()
