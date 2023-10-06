import { Module, forwardRef } from '@nestjs/common'
import { TasksController } from 'infra/http/tasks'
import { TaskService } from 'application/task'
import { TaskDtb } from 'infra/adapters/task'
import { DatabaseModule } from 'modules/database/Database.module'
import { InvoicesModule } from 'modules/invoices'
import { InvoicesServices } from 'application/invoices'

@Module({
	imports: [DatabaseModule, forwardRef(() => InvoicesModule)],
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
	],
	exports: ['ITasksService', 'ITasksRepository'],
	controllers: [TasksController],
})
export class TasksModule {}
