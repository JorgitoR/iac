import { Module, forwardRef } from '@nestjs/common'
import { LeaveController } from 'infra/http/leave'
import { LeaveService } from 'application/leave'
import { LeaveDtb } from 'infra/adapters/leave'
import { DatabaseModule } from 'modules/database/Database.module'
import { TimesheetsModule } from 'modules/timesheets'
import { TimesheetsService } from 'application/timesheets'

@Module({
	imports: [DatabaseModule, forwardRef(() => TimesheetsModule)],
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
	],
	controllers: [LeaveController],
})
export class LeaveModule {}
