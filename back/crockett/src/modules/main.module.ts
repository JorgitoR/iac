import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { Module } from '@nestjs/common'
import { AppModule } from 'modules/app/app.module'
import { DatabaseModule } from 'modules/database/Database.module'
import { AWSS3Module } from './aws/aws-s3.module'
import { RegisterModule } from './scaffold-register/register.module'
import { AuthModule } from './auth'
import { StaffModule } from './staff/staff.module'
import { ClientsModule } from './clients/clients.module'
import { ContactsModule } from './contacts'
import { QuotesModule } from './quotes'
import { JobsModule } from './jobs/jobs.module'
import { HandoverModule } from './handover'
import { TasksModule } from './tasks/tasks.module'
import { VehiclesModule } from './vehicles'
import { AssetsModule } from './assets/assets.module'
import { InvoicesModule } from './invoices'
import { VisitsModule } from './visits'
import { TimesheetsModule } from './timesheets'
import { AppFilesModule } from './appFiles/appFiles.module'
import { LeaveModule } from './leave/leave.module'
import { NotesModule } from './notes/notes.module'
import { InvestigationReportModule } from './investigation-report'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.development.env', '.env'],
		}),
		DatabaseModule,
		AWSS3Module,
		AppFilesModule,
		RegisterModule,
		AppModule,
		AuthModule,
		StaffModule,
		ClientsModule,
		ContactsModule,
		QuotesModule,
		JobsModule,
		HandoverModule,
		TasksModule,
		InvoicesModule,
		AssetsModule,
		VehiclesModule,
		VisitsModule,
		TimesheetsModule,
		LeaveModule,
		NotesModule,
		InvestigationReportModule,
	],
	providers: [],
})
export class MainModule {}
