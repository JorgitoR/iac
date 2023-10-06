import { Module } from '@nestjs/common'
import { VisitsController } from 'infra/http/visits'
import { VisitsService } from 'application/visits'
import { VisitsDtb } from 'infra/adapters/visits'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'IVisitsService', useClass: VisitsService },
		{
			provide: 'IVisitsRepository',
			useClass: VisitsDtb,
		},
	],
	controllers: [VisitsController],
})
export class VisitsModule {}
