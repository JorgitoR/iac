import { Module, forwardRef } from '@nestjs/common'
import { TasksController } from 'infra/http/tasks'
import { TaskService } from 'application/task'
import { TaskDtb } from 'infra/adapters/task'
import { DatabaseModule } from 'modules/database/Database.module'
import { InvoicesModule } from 'modules/invoices'
import { InvoicesServices } from 'application/invoices'
import { AppenateService } from 'application/appenate'
import { AppenateModule } from 'modules/appenate'

@Module({
	imports: [DatabaseModule, forwardRef(() => InvoicesModule), AppenateModule],
	providers: [
		{
			provide: 'ITasksService',
			useClass: TaskService,
		},
		{
			provide: 'ITasksRepository',
			useClass: TaskDtb,
		},
		{
			provide: 'IInvoicesService',
			useClass: InvoicesServices,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	exports: ['ITasksService', 'ITasksRepository'],
	controllers: [TasksController],
})
export class TasksModule {}
