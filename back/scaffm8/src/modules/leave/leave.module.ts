import { Module, forwardRef } from '@nestjs/common'
import { LeaveController } from 'infra/http/leave'
import { LeaveService } from 'application/leave'
import { LeaveDtb } from 'infra/adapters/leave'
import { DatabaseModule } from 'modules/database/Database.module'
import { TimesheetsModule } from 'modules/timesheets'
import { TimesheetsService } from 'application/timesheets'
import { VisitsTimesheetModule } from 'modules/visit_timesheets/visit_timesheets.module'
import { VisitsTimesheetService } from 'application/visits-timesheet'
import { AppenateService } from 'application/appenate'
import { AppenateModule } from 'modules/appenate'

@Module({
	imports: [
		DatabaseModule,
		forwardRef(() => TimesheetsModule),
		forwardRef(() => VisitsTimesheetModule),
		AppenateModule,
	],
	providers: [
		{ provide: 'ILeaveService', useClass: LeaveService },
		{
			provide: 'ILeaveRepository',
			useClass: LeaveDtb,
		},
		{
			provide: 'ITimesheetsService',
			useClass: TimesheetsService,
		},
		{
			provide: 'IVisitsTimesheetService',
			useClass: VisitsTimesheetService,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [LeaveController],
})
export class LeaveModule {}
