import { Module } from '@nestjs/common'
import { AppController } from 'infra/http/app/app.controller'
import { AppService } from 'application/app/app.service'

@Module({
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
