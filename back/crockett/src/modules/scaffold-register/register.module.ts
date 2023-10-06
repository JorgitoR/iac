import { Module } from '@nestjs/common'
import { ScaffoldRegisterController } from 'infra/http/scaffold-register/register.controller'
import { RegisterUseCase } from 'application/scaffold-register/register.service'
import { RegisterDtb } from 'infra/adapters/scaffold-register/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'IRegisterService', useClass: RegisterUseCase },
		{
			provide: 'IRegisterRepository',
			useClass: RegisterDtb,
		},
	],
	controllers: [ScaffoldRegisterController],
})
export class RegisterModule {}
