import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World! ' + String(process.env.PORTAL_NAME)
	}
}
