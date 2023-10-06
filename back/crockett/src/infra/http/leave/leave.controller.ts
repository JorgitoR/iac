import {
	Controller,
	Inject,
	Get,
	Post,
	Put,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { ILeaveService, Leave } from 'domain/leave'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('Leaves')
@Controller('leaves')
export class LeaveController {
	constructor(
		@Inject('ILeaveService')
		private readonly leaveService: ILeaveService
	) {}

	@ApiOperation({ summary: 'Get All Leave' })
	@ApiResponse({ status: 200, description: 'Success', type: ResponseModel })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@Get()
	async getAll(): Promise<ResponseModel<Leave[]>> {
		const result = await this.leaveService.getAll()
		return result
	}

	@ApiOperation({ summary: 'Get Leave By Id' })
	@ApiResponse({ status: 200, description: 'Success' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@Get(':id')
	async getById(@Param('id') id: number): Promise<ResponseModel<Leave>> {
		const result = await this.leaveService.getById(id)
		return result
	}

	@ApiOperation({ summary: 'Update Leave' })
	@ApiResponse({ status: 200, description: 'Success' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@Put()
	async create(
		@Body() leave: any
	): Promise<ResponseModel<{ created: boolean }>> {
		const result = await this.leaveService.create(leave)
		return result
	}

	@ApiOperation({ summary: 'Update Leave' })
	@ApiResponse({ status: 200, description: 'Success' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@Post(':id')
	async update(
		@Param('id') id: number,
		@Body() leave: any
	): Promise<ResponseModel<{ updated: boolean }>> {
		const result = await this.leaveService.update(id, leave)
		return result
	}

	@ApiOperation({ summary: 'Approve Leave' })
	@ApiResponse({ status: 200, description: 'Success' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@Post(':id/approve')
	async approve(
		@Param('id') id: number,
		@Body() body: any
	): Promise<ResponseModel<{ updated: boolean }>> {
		const result = await this.leaveService.approve(id, body.approvedBy)
		return result
	}

	@ApiOperation({ summary: 'Decline Leave' })
	@ApiResponse({ status: 200, description: 'Success' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@Post(':id/decline')
	async decline(
		@Param('id') id: number,
		@Body() body: any
	): Promise<ResponseModel<{ updated: boolean }>> {
		const result = await this.leaveService.decline(id, body.approvedBy)
		return result
	}
}
