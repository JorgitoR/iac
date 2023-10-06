import { Module } from '@nestjs/common'
import { ClientsController } from 'infra/http/clients/clients.controller'
import { ClientsService } from 'application/clients/clients.service'
import { ClientDtb } from 'infra/adapters/clients/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateModule } from 'modules/appenate'
import { AppenateService } from 'application/appenate'

@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{
			provide: 'IClientsService',
			useClass: ClientsService,
		},
		{
			provide: 'IClientsRepository',
			useClass: ClientDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [ClientsController],
})
export class ClientsModule {}
