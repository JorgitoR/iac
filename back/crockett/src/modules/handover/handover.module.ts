import { Module } from '@nestjs/common'
import { HandoverController } from 'infra/http/handover'
import { HandOverService } from 'application/handover'
import { HandoverDtb } from 'infra/adapters/handover'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: 'IHandoverService',
			useClass: HandOverService,
		},
		{
			provide: 'IHandOverRepository',
			useClass: HandoverDtb,
		},
	],
	exports: ['IHandoverService', 'IHandOverRepository'],
	controllers: [HandoverController],
})
export class HandoverModule {}
