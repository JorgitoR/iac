import { Module, forwardRef } from '@nestjs/common'
import { ClientsController } from 'infra/http/clients/clients.controller'
import { ClientsService } from 'application/clients/clients.service'
import { ClientDtb } from 'infra/adapters/clients/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: 'IClientsService',
			useClass: ClientsService,
		},
		{
			provide: 'IClientsRepository',
			useClass: ClientDtb,
		},
	],
	controllers: [ClientsController],
})
export class ClientsModule {}
