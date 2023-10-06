import { Module } from '@nestjs/common'
import { VisitsController } from 'infra/http/visits'
import { VisitsService } from 'application/visits'
import { VisitsDtb } from 'infra/adapters/visits'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateService } from 'application/appenate'
import { AppenateModule } from 'modules/appenate'
@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{ provide: 'IVisitsService', useClass: VisitsService },
		{
			provide: 'IVisitsRepository',
			useClass: VisitsDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [VisitsController],
})
export class VisitsModule {}
