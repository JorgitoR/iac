import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AppService } from 'application/app/app.service'
@ApiTags('App')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Hello World For Load Balancer' })
	@ApiResponse({
		status: 200,
		description: 'Hello World For Load Balancer',
	})
	getHello(): string {
		return this.appService.getHello()
	}

	@Get('/health')
	@ApiOperation({ summary: 'Hello World For Load Balancer /health' })
	@ApiResponse({
		status: 200,
		description: 'Hello World For Load Balancer /health',
	})
	getHealt(): string {
		return this.appService.getHello()
	}
}
