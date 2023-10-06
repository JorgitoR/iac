import { Module } from '@nestjs/common'
import { InvoicesController } from 'infra/http/invoices'
import { InvoicesServices } from 'application/invoices'
import { EDInvoicesDtb, WeeklyHireDtb } from 'infra/adapters/invoices'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: 'IInvoicesService',
			useClass: InvoicesServices,
		},
		{
			provide: 'IEDInvoicesRepository',
			useClass: EDInvoicesDtb,
		},
		{
			provide: 'IWeeklyHireRepository',
			useClass: WeeklyHireDtb,
		},
	],
	exports: [
		'IInvoicesService',
		'IEDInvoicesRepository',
		'IWeeklyHireRepository',
	],
	controllers: [InvoicesController],
})
export class InvoicesModule {}
