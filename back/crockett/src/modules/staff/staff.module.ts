import { Module, forwardRef } from '@nestjs/common'
import { StaffController } from 'infra/http/staff/staff.controller'
import { StaffService } from 'application/staff/staff.service'
import { AuthService } from 'application/auth/auth.service'
import { StaffDtb } from 'infra/adapters/staff/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'
import { AuthModule } from 'modules/auth'

@Module({
	imports: [DatabaseModule, forwardRef(() => AuthModule)],
	providers: [
		{ provide: 'IStaffService', useClass: StaffService },
		{
			provide: 'IStaffRepository',
			useClass: StaffDtb,
		},
		{ provide: 'AuthService', useClass: AuthService },
	],
	controllers: [StaffController],
})
export class StaffModule {}
