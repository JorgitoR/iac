import { Module } from '@nestjs/common'
import { AssetsController } from 'infra/http/assets'
import { AssetsService } from 'application/assets'
import { AssetsDtb } from 'infra/adapters/assets'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'IAssetsService', useClass: AssetsService },
		{
			provide: 'IAssetsRepository',
			useClass: AssetsDtb,
		},
	],
	controllers: [AssetsController],
})
export class AssetsModule {}
