import { Module, forwardRef } from '@nestjs/common'
import {
	QuoteAddonsController,
	QuoteGeneralController,
	QuoteLinesController,
	QuoteRatesController,
	QuoteZonesController,
	ServiceRatesController,
} from 'infra/http/quotes'
import {
	QuotesGeneralService,
	QuoteLinesService,
	QuoteRatesService,
	QuoteZonesService,
	QuotesAddonsService,
	ServiceRatesService,
} from 'application/quotes'
import {
	QuoteAddonsDtb,
	QuoteGeneralDtb,
	QuoteLinesdtb,
	QuoteZonesdtb,
	ServiceRatesdtb,
	QuoteRatesdtb,
} from 'infra/adapters/quotes'
import { TaskService } from 'application/task'
import { HandOverService } from 'application/handover'
import { JobsService } from 'application/jobs'
import { DatabaseModule } from 'modules/database/Database.module'
import { JobsModule } from 'modules/jobs/jobs.module'
import { HandoverModule } from 'modules/handover'
import { TasksModule } from 'modules/tasks/tasks.module'
import { ConfigModule } from '@nestjs/config'
import { SmtpAdapter } from 'infra/smtp'
import { AproveQuotesService } from 'application/quotes/quote_general/quote_approve.service'
import { InvoicesModule } from 'modules/invoices'

@Module({
	imports: [
		DatabaseModule,
		ConfigModule.forRoot(),
		forwardRef(() => JobsModule),
		forwardRef(() => TasksModule),
		forwardRef(() => HandoverModule),
		forwardRef(() => InvoicesModule),
	],
	providers: [
		{
			provide: 'IQuoteLinesService',
			useClass: QuoteLinesService,
		},
		{
			provide: 'IQuoteRatesService',
			useClass: QuoteRatesService,
		},
		{
			provide: 'IQuoteZonesService',
			useClass: QuoteZonesService,
		},
		{
			provide: 'IQuotesAddOnsService',
			useClass: QuotesAddonsService,
		},
		{
			provide: 'IQuotesService',
			useClass: QuotesGeneralService,
		},
		{
			provide: 'IApproveQuotesService',
			useClass: AproveQuotesService,
		},
		{
			provide: 'IServiceRatesService',
			useClass: ServiceRatesService,
		},
		{
			provide: 'IQuotesAddonsRepository',
			useClass: QuoteAddonsDtb,
		},
		{
			provide: 'IQuotesRepository',
			useClass: QuoteGeneralDtb,
		},
		{
			provide: 'IQuoteLinesRepository',
			useClass: QuoteLinesdtb,
		},
		{
			provide: 'IQuoteZonesRepository',
			useClass: QuoteZonesdtb,
		},
		{
			provide: 'IServiceRatesRepository',
			useClass: ServiceRatesdtb,
		},
		{
			provide: 'IQuoteRatesRepository',
			useClass: QuoteRatesdtb,
		},
		{
			provide: 'ITaskService',
			useClass: TaskService,
		},
		{
			provide: 'IJobsService',
			useClass: JobsService,
		},
		{
			provide: 'IHandOverService',
			useClass: HandOverService,
		},
		SmtpAdapter,
	],
	controllers: [
		QuoteAddonsController,
		QuoteGeneralController,
		QuoteLinesController,
		QuoteRatesController,
		QuoteZonesController,
		ServiceRatesController,
	],
})
export class QuotesModule {}
