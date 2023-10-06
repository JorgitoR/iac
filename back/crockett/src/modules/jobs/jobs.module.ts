import { Module, forwardRef } from '@nestjs/common'
import { JobsController } from 'infra/http/jobs'
import { HandoverModule } from 'modules/handover'
import { HandOverService } from 'application/handover'
import { JobsService } from 'application/jobs'
import { JobsDtb } from 'infra/adapters/jobs'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule, forwardRef(() => HandoverModule)],
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
	],
	exports: ['IJobsService', 'IJobsRepository'],
	controllers: [JobsController],
})
export class JobsModule {}
