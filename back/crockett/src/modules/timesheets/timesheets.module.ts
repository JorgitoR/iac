import { Module } from '@nestjs/common'
import { TimesheetsController } from 'infra/http/timesheets'
import { TimesheetsService } from 'application/timesheets'
import { TimesheetsDtb } from 'infra/adapters/timesheets'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'ITimesheetsService', useClass: TimesheetsService },
		{
			provide: 'ITimesheetsRepository',
			useClass: TimesheetsDtb,
		},
	],
	controllers: [TimesheetsController],
	exports: ['ITimesheetsService', 'ITimesheetsRepository'],
})
export class TimesheetsModule {}
