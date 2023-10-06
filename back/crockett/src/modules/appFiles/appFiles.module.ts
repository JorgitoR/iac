import { Module } from '@nestjs/common'
import { AppFilesController } from 'infra/http/app-files'
import { AppFilesService } from 'application/appFiles'
import { AppFilesDtb } from 'infra/adapters/appFiles'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'IAppFilesService', useClass: AppFilesService },
		{
			provide: 'IAppFilesRepository',
			useClass: AppFilesDtb,
		},
	],
	controllers: [AppFilesController],
})
export class AppFilesModule {}
