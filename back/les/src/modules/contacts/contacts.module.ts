import { Module } from '@nestjs/common'
import {
	ContactsController,
	ClientsContactsController,
} from 'infra/http/contacts'
import { ContactsService } from 'application/contacts/contacts.service'
import { ContactsDtb } from 'infra/adapters/contacts/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'

@Module({
	imports: [DatabaseModule],
	providers: [
		{ provide: 'IContactsService', useClass: ContactsService },
		{
			provide: 'IContactsRepository',
			useClass: ContactsDtb,
		},
	],
	controllers: [ContactsController, ClientsContactsController],
})
export class ContactsModule {}
