import { Module } from '@nestjs/common'
import { VehiclesController } from 'infra/http/vehicles/vehicles.controller'
import { VehiclesService } from 'application/vehicles/vehicles.service'
import { VehiclesDtb } from 'infra/adapters/vehicles/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'
import { AppenateService } from 'application/appenate'
import { AppenateModule } from 'modules/appenate'

@Module({
	imports: [DatabaseModule, AppenateModule],
	providers: [
		{ provide: 'IVehiclesService', useClass: VehiclesService },
		{
			provide: 'IVehiclesRepository',
			useClass: VehiclesDtb,
		},
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [VehiclesController],
})
export class VehiclesModule {}
