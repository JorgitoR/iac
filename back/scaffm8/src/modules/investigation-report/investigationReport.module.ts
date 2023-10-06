import { Module } from '@nestjs/common'
import { InvestigationReportController } from 'infra/http/investigationReport'
import { InvestigationReportService } from 'application/investigation-report'
import { InvestigationReportDtb } from 'infra/adapters/investigation-report'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: 'IInvestigationReportService',
			useClass: InvestigationReportService,
		},
		{
			provide: 'IInvestigationReportRepository',
			useClass: InvestigationReportDtb,
		},
	],
	exports: ['IInvestigationReportService', 'IInvestigationReportRepository'],
	controllers: [InvestigationReportController],
})
export class InvestigationReportModule {}
