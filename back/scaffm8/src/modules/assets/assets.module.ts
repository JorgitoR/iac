import { Module } from '@nestjs/common'
import { AssetsController } from 'infra/http/assets'
import { AssetsService } from 'application/assets'
import { AssetsDtb } from 'infra/adapters/assets'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateService } from 'application/appenate'
import { AppenateModule } from 'modules/appenate'
@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{
			provide: 'IAssetsService',
			useClass: AssetsService,
		},
		{
			provide: 'IAssetsRepository',
			useClass: AssetsDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [AssetsController],
})
export class AssetsModule {}
