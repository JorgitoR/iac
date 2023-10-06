import { Module } from '@nestjs/common'
import { AppFilesController } from 'infra/http/app-files'
import { AppFilesService } from 'application/appFiles'
import { AppFilesDtb } from 'infra/adapters/appFiles'
import { DatabaseModule } from 'modules/database/Database.module'
import { AwsS3Adapter } from 'infra/adapters/aws_s3'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'IAppFilesService', useClass: AppFilesService },
		{
			provide: 'IAppFilesRepository',
			useClass: AppFilesDtb,
		},
		{
			provide: 'IAwsS3Repository',
			useClass: AwsS3Adapter,
		},
	],
	controllers: [AppFilesController],
})
export class AppFilesModule {}
