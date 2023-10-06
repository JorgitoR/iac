import { Module, forwardRef } from '@nestjs/common'
import { JobsController } from 'infra/http/jobs'
import { HandoverModule } from 'modules/handover'
import { HandOverService } from 'application/handover'
import { JobsService } from 'application/jobs'
import { JobsDtb } from 'infra/adapters/jobs'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateService } from 'application/appenate'
import { AppenateModule } from 'modules/appenate'

@Module({
	imports: [DatabaseModule, forwardRef(() => HandoverModule), AppenateModule],
	providers: [
		{
			provide: 'IJobsService',
			useClass: JobsService,
		},
		{
			provide: 'IJobsRepository',
			useClass: JobsDtb,
		},
		{
			provide: 'IHandoverService',
			useClass: HandOverService,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	exports: ['IJobsService', 'IJobsRepository'],
	controllers: [JobsController],
})
export class JobsModule {}
