import { Module } from '@nestjs/common'
import { NotesService } from 'application/notes'
import { NotesDtb } from 'infra/adapters/notes'
import { DatabaseModule } from 'modules/database/Database.module'
import { NotesController } from 'infra/http/notes'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: 'INotesService',
			useClass: NotesService,
		},
		{
			provide: 'INotesRepository',
			useClass: NotesDtb,
		},
	],
	controllers: [NotesController],
})
export class NotesModule {}
