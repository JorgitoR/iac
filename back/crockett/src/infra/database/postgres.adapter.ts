import {
	Injectable,
	OnApplicationBootstrap,
	OnApplicationShutdown,
} from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import { ConfigService } from '@nestjs/config'
import {
	Staff,
	User,
	AppEntrys,
	Client,
	ClientContact,
	Quotes,
	QuoteLines,
	QuoteAddons,
	ServiceRates,
	QuoteRates,
	QuoteZones,
	Assets,
	Vehicles,
	Jobs,
	JobTask,
	WeeklyHireInvoices,
	EdInvoices,
	Visits,
	VisitTimesheets,
	ScaffoldTags,
	Handover,
	Timesheets,
	Leave,
	Notes,
	InvestigationReports,
} from './models'

@Injectable()
export class PostgresAdapter
	implements OnApplicationBootstrap, OnApplicationShutdown
{
	private sequelize: Sequelize
	private isConnecting = false
	private connectAttempts = 0
	private readonly maxConnectAttempts = 10

	constructor(private readonly configService: ConfigService) {}

	async onApplicationBootstrap(): Promise<void> {
		await this.connect()
	}

	async onApplicationShutdown(): Promise<void> {
		await this.disconnect()
	}

	private async connect(): Promise<void> {
		try {
			const dbHost = this.configService.get<string>('DB_HOST')
			const dbPort = this.configService.get<number>('DB_PORT')
			const dbName = this.configService.get<string>('DB_NAME')
			const dbUser = this.configService.get<string>('DB_USER')
			const dbPassword = this.configService.get<string>('DB_PASSWORD')

			this.isConnecting = true
			this.sequelize = new Sequelize({
				dialect: 'postgres',
				host: dbHost,
				port: dbPort,
				database: dbName,
				username: dbUser,
				password: dbPassword,
				pool: {
					max: 50,
					min: 0,
					acquire: 30000,
					idle: 10000,
				},
				logging: false,
			})
			this.sequelize.addModels([
				User,
				Staff,
				AppEntrys,
				Client,
				ClientContact,
				ServiceRates,
				Quotes,
				QuoteRates,
				QuoteZones,
				QuoteLines,
				QuoteAddons,
				Jobs,
				JobTask,
				WeeklyHireInvoices,
				EdInvoices,
				Visits,
				VisitTimesheets,
				Assets,
				Vehicles,
				ScaffoldTags,
				Handover,
				Timesheets,
				Leave,
				Notes,
				InvestigationReports,
			])
			await this.sequelize.authenticate()
			console.log('Connected to database successfully')
			this.isConnecting = false
			this.sequelize
				.sync({ alter: true })
				.then(() => {
					console.log('Database synced successfully')
				})
				.catch((err) => {
					console.log('Error syncing database: ')
					console.log(err)
				})
				.finally(() => {
					console.log('Process complete of syncing database tables completed')
				})
		} catch (err) {
			console.error(`Error connecting to database: ${err}`)
			this.connectAttempts++
			if (this.connectAttempts < this.maxConnectAttempts) {
				console.log(
					`Retrying connection in 5 seconds (attempt ${
						this.connectAttempts + 1
					}/${this.maxConnectAttempts})`
				)
				setTimeout(async () => {
					await this.connect()
				}, 5000)
			} else {
				console.error(
					`Max connection attempts (${this.maxConnectAttempts}) reached, closing application`
				)
				process.exit(1)
			}
		}
	}

	private async disconnect(): Promise<void> {
		if (this.sequelize) {
			await this.sequelize.close()
		}
	}

	getSequelizeInstance(): Sequelize {
		return this.sequelize
	}
}
