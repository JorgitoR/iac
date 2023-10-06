import { Module } from '@nestjs/common'
import { TimesheetsController } from 'infra/http/timesheets'
import { TimesheetsService } from 'application/timesheets'
import { TimesheetsDtb } from 'infra/adapters/timesheets'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateModule } from 'modules/appenate'
import { AppenateService } from 'application/appenate'

@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{ provide: 'ITimesheetsService', useClass: TimesheetsService },
		{
			provide: 'ITimesheetsRepository',
			useClass: TimesheetsDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [TimesheetsController],
	exports: ['ITimesheetsService', 'ITimesheetsRepository'],
})
export class TimesheetsModule {}
