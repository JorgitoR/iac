import { Module } from '@nestjs/common'
import { AppenateService } from 'application/appenate'
import { VisitsTimesheetService } from 'application/visits-timesheet'
import { VisitTimesheetDtb } from 'infra/adapters/visit_timesheets'
import { AppenateModule } from 'modules/appenate'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{ provide: 'IVisitsTimesheetService', useClass: VisitsTimesheetService },
		{
			provide: 'IVisitsTimesheetRepository',
			useClass: VisitTimesheetDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	exports: ['IVisitsTimesheetService', 'IVisitsTimesheetRepository'],
})
export class VisitsTimesheetModule {}
