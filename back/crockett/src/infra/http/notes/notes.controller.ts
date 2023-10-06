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
import { INotesService, Notes } from 'domain/notes'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
	constructor(
		@Inject('INotesService')
		private readonly NotesService: INotesService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all Notes' })
	@ApiResponse({
		status: 200,
		description: 'Notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'Notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAll(): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAll()
		return result
	}

	@Get('asset/:id')
	@ApiOperation({ summary: 'Get all notes by asset id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyAssetId(
		@Param('id') id: number
	): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAllbyAssetId(id)
		return result
	}

	@Get('client/:id')
	@ApiOperation({ summary: 'Get all notes by client id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyClientsId(
		@Param('id') id: number
	): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAllbyClientsId(id)
		return result
	}

	@Get('job/:id')
	@ApiOperation({ summary: 'Get all notes by job id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyJobId(
		@Param('id') id: number
	): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAllbyJobId(id)
		return result
	}

	@Get('visit/:id')
	@ApiOperation({ summary: 'Get all notes by visit id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyVisitId(
		@Param('id') id: number
	): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAllbyVisitId(id)
		return result
	}

	@Get('vehicle/:id')
	@ApiOperation({ summary: 'Get all notes by vehicle id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyVehicleId(
		@Param('id') id: number
	): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAllbyVehicleId(id)
		return result
	}

	@Get('staff/:id')
	@ApiOperation({ summary: 'Get all notes by staff id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyStaffId(
		@Param('id') id: number
	): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAllbyStaffId(id)
		return result
	}

	@Get('scaffoldRegister/:id')
	@ApiOperation({ summary: 'Get all notes by tag id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getAllbyTagId(
		@Param('id') id: number
	): Promise<ResponseModel<Notes[]>> {
		const result = await this.NotesService.getAllbyTagId(id)
		return result
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get notes by id' })
	@ApiResponse({
		status: 200,
		description: 'notes found',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async getById(@Param('id') id: number): Promise<ResponseModel<Notes>> {
		const result = await this.NotesService.getById(id)
		return result
	}

	@Put()
	@ApiOperation({ summary: 'Create notes' })
	@ApiResponse({
		status: 200,
		description: 'notes created successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async create(
		@Body() body: any
	): Promise<ResponseModel<{ created: boolean }>> {
		const result = await this.NotesService.create(body)
		return result
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update notes' })
	@ApiResponse({
		status: 200,
		description: 'notes updated successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async update(
		@Param('id') id: number,
		@Body() body: any
	): Promise<ResponseModel<{ updated: boolean }>> {
		const result = await this.NotesService.update(id, body)
		return result
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete notes' })
	@ApiResponse({
		status: 200,
		description: 'notes deleted successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'notes not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async delete(
		@Param('id') id: number
	): Promise<ResponseModel<{ deleted: boolean }>> {
		const result = await this.NotesService.delete(id)
		return result
	}
}
