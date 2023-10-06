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
import { IStaffService, Staff } from 'domain/staff'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'
import { CreateStaffDto } from './createStaff.dto'

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
	constructor(
		@Inject('IStaffService') private readonly staffService: IStaffService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all staff' })
	@ApiResponse({ status: 200, description: 'Get all staff' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@HttpCode(200)
	async getAll(): Promise<ResponseModel<Staff[]>> {
		const response = this.staffService.getAll()
		return response
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get staff by id' })
	@ApiResponse({ status: 200, description: 'Get staff by id' })
	@ApiResponse({ status: 404, description: 'Staff not Found' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@HttpCode(200)
	async getById(@Param('id') id: number): Promise<ResponseModel<Staff>> {
		const response = await this.staffService.getById(id)
		return response
	}

	@Put()
	@ApiOperation({ summary: 'Create staff' })
	@ApiResponse({ status: 200, description: 'Create staff' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@HttpCode(200)
	async create(
		@Body() staff: CreateStaffDto
	): Promise<ResponseModel<{ created: boolean }>> {
		const response = this.staffService.create(staff as Staff)
		return response
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update staff' })
	@ApiResponse({ status: 200, description: 'Updated staff' })
	@ApiResponse({ status: 404, description: 'Staff not Found' })
	@ApiResponse({
		status: 409,
		description: 'Conflict, Email already used for other staff',
	})
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	@HttpCode(200)
	async update(
		@Param('id') id: number,
		@Body() staff: CreateStaffDto
	): Promise<ResponseModel<{ updated: boolean }>> {
		const response = this.staffService.update(id, staff as Staff)
		return response
	}
}
