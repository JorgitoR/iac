import {
	Controller,
	Inject,
	Get,
	Post,
	Put,
	Body,
	HttpCode,
	Param,
	Delete,
} from '@nestjs/common'
import { IAppFilesService, AppFile } from 'domain/appFiles'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('App Files')
@Controller('app-files')
export class AppFilesController {
	constructor(
		@Inject('IAppFilesService')
		private readonly appFilesService: IAppFilesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all app files' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAll(): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAll()
		return result
	}

	@Get('asset/:id')
	@ApiOperation({ summary: 'Get all app files by asset id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyAssetId(
		@Param('id') id: number
	): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAllbyAssetId(id)
		return result
	}

	@Get('client/:id')
	@ApiOperation({ summary: 'Get all app files by client id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyClientsId(
		@Param('id') id: number
	): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAllbyClientsId(id)
		return result
	}

	@Get('job/:id')
	@ApiOperation({ summary: 'Get all app files by job id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyJobId(
		@Param('id') id: number
	): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAllbyJobId(id)
		return result
	}

	@Get('visit/:id')
	@ApiOperation({ summary: 'Get all app files by visit id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyVisitId(
		@Param('id') id: number
	): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAllbyVisitId(id)
		return result
	}

	@Get('vehicle/:id')
	@ApiOperation({ summary: 'Get all app files by vehicle id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyVehicleId(
		@Param('id') id: number
	): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAllbyVehicleId(id)
		return result
	}

	@Get('staff/:id')
	@ApiOperation({ summary: 'Get all app files by staff id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyStaffId(
		@Param('id') id: number
	): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAllbyStaffId(id)
		return result
	}

	@Get('scaffoldRegister/:id')
	@ApiOperation({ summary: 'Get all app files by tag id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyTagId(
		@Param('id') id: number
	): Promise<ResponseModel<AppFile[]>> {
		const result = await this.appFilesService.getAllbyTagId(id)
		return result
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get app files by id' })
	@ApiResponse({
		status: 200,
		description: 'App files found',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getById(@Param('id') id: number): Promise<ResponseModel<AppFile>> {
		const result = await this.appFilesService.getById(id)
		return result
	}

	@Put()
	@ApiOperation({ summary: 'Create app files' })
	@ApiResponse({
		status: 200,
		description: 'App files created successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async create(
		@Body() body: AppFile
	): Promise<ResponseModel<{ created: boolean }>> {
		const result = await this.appFilesService.create(body)
		return result
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update app files' })
	@ApiResponse({
		status: 200,
		description: 'App files updated successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async update(
		@Param('id') id: number,
		@Body() body: AppFile
	): Promise<ResponseModel<{ updated: boolean }>> {
		const result = await this.appFilesService.update(id, body)
		return result
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete app files' })
	@ApiResponse({
		status: 200,
		description: 'App files deleted successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'App files not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async delete(
		@Param('id') id: number
	): Promise<ResponseModel<{ deleted: boolean }>> {
		const result = await this.appFilesService.delete(id)
		return result
	}
}
