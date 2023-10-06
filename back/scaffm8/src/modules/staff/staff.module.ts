import { Module, forwardRef } from '@nestjs/common'
import { StaffController } from 'infra/http/staff/staff.controller'
import { StaffService } from 'application/staff/staff.service'
import { AuthService } from 'application/auth/auth.service'
import { StaffDtb } from 'infra/adapters/staff/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'
import { AuthModule } from 'modules/auth'
import { AppenateModule } from 'modules/appenate'
import { AppenateService } from 'application/appenate'

@Module({
	imports: [DatabaseModule, forwardRef(() => AuthModule), AppenateModule],
	providers: [
		{ provide: 'IStaffService', useClass: StaffService },
		{
			provide: 'IStaffRepository',
			useClass: StaffDtb,
		},
		{ provide: 'AuthService', useClass: AuthService },
		{
			provide: 'IAppenateService',
			useClass: AppenateService,
		},
	],
	controllers: [StaffController],
})
export class StaffModule {}
