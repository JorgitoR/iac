import { Module } from '@nestjs/common'
import { ScaffoldRegisterController } from 'infra/http/scaffold-register/register.controller'
import { RegisterUseCase } from 'application/scaffold-register/register.service'
import { RegisterDtb } from 'infra/adapters/scaffold-register/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateModule } from 'modules/appenate'
import { AppenateService } from 'application/appenate'

@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{ provide: 'IRegisterService', useClass: RegisterUseCase },
		{
			provide: 'IRegisterRepository',
			useClass: RegisterDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [ScaffoldRegisterController],
})
export class RegisterModule {}
