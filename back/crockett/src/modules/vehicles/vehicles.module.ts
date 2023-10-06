import { Module } from '@nestjs/common'
import { VehiclesController } from 'infra/http/vehicles/vehicles.controller'
import { VehiclesService } from 'application/vehicles/vehicles.service'
import { VehiclesDtb } from 'infra/adapters/vehicles/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'IVehiclesService', useClass: VehiclesService },
		{
			provide: 'IVehiclesRepository',
			useClass: VehiclesDtb,
		},
	],
	controllers: [VehiclesController],
})
export class VehiclesModule {}
