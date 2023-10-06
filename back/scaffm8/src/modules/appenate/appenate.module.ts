import { Module } from '@nestjs/common'

import { AssetsDtb } from 'infra/adapters/assets'
import { VehiclesDtb } from 'infra/adapters/vehicles'
import { TimesheetsDtb } from 'infra/adapters/timesheets'
import { TaskDtb } from 'infra/adapters/task'
import { StaffDtb } from 'infra/adapters/staff'
import { RegisterDtb } from 'infra/adapters/scaffold-register'
import { JobsDtb } from 'infra/adapters/jobs'
import { HandoverDtb } from 'infra/adapters/handover'
import { ClientDtb } from 'infra/adapters/clients'
import { VisitsDtb } from 'infra/adapters/visits'
import { ContactsDtb } from 'infra/adapters/contacts/dtb.adapters'

import { AppenateNet } from 'infra/adapters/appenate'
import { AppenateService } from 'application/appenate/appenate.service'
import { DatabaseModule } from 'modules/database/Database.module'

const providers = [
	{
		provide: 'IAppenateService',
		useClass: AppenateService,
	},
	{
		provide: 'IAppenateRepository',
		useClass: AppenateNet,
	},
	{
		provide: 'IAssetsRepository',
		useClass: AssetsDtb,
	},
	{
		provide: 'IVehiclesRepository',
		useClass: VehiclesDtb,
	},
	{
		provide: 'ITimesheetsRepository',
		useClass: TimesheetsDtb,
	},
	{
		provide: 'ITaskRepository',
		useClass: TaskDtb,
	},
	{
		provide: 'IStaffRepository',
		useClass: StaffDtb,
	},
	{
		provide: 'IRegisterRepository',
		useClass: RegisterDtb,
	},
	{
		provide: 'IJobsRepository',
		useClass: JobsDtb,
	},
	{
		provide: 'IHandoverRepository',
		useClass: HandoverDtb,
	},
	{
		provide: 'IClientsRepository',
		useClass: ClientDtb,
	},
	{
		provide: 'IVisitsRepository',
		useClass: VisitsDtb,
	},
	{
		provide: 'IContactsRepository',
		useClass: ContactsDtb,
	},
]

@Module({
	imports: [DatabaseModule],
	providers: providers,
	exports: providers,
})
export class AppenateModule {}
