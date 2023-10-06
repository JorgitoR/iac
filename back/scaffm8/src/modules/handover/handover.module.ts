import { Module, forwardRef } from '@nestjs/common'
import { HandoverController } from 'infra/http/handover'
import { HandOverService } from 'application/handover'
import { HandoverDtb } from 'infra/adapters/handover'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateService } from 'application/appenate'
import { AppenateModule } from 'modules/appenate'
@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{
			provide: 'IHandoverService',
			useClass: HandOverService,
		},
		{
			provide: 'IHandOverRepository',
			useClass: HandoverDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	exports: ['IHandoverService', 'IHandOverRepository'],
	controllers: [HandoverController],
})
export class HandoverModule {}
