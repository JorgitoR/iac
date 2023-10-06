import {
	Controller,
	Inject,
	Post,
	Put,
	Get,
	Body,
	Param,
	HttpCode,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Register } from './dto/register.dto'
import { IRegisterService } from '../../../domain/scaffold-register/IRegisterService'

@ApiTags('Scaffold Register')
@Controller('ScaffoldRegister')
export class ScaffoldRegisterController {
	constructor(
		@Inject('IRegisterService') private readonly register: IRegisterService
	) {}

	@Put()
	@ApiOperation({ summary: 'Create scaffold register' })
	@ApiResponse({
		status: 200,
		description: 'Scaffold register created successfully',
	})
	@ApiResponse({
		status: 400,
		description: 'Tag_no is unique and already exist',
	})
	@ApiResponse({
		status: 404,
		description: 'Jobs Id doesnt exist',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async Register(@Body() body: Register) {
		const result = await this.register.createScaffoldRegister(body)
		return result
	}

	@Get()
	@ApiOperation({ summary: 'Get all scaffold register' })
	@ApiResponse({
		status: 200,
		description: 'Scaffold register found',
	})
	@ApiResponse({
		status: 404,
		description: 'Scaffold register not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async Registers() {
		const result = await this.register.getAllRegister()
		return result
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Get scaffold register by id' })
	@ApiResponse({
		status: 200,
		description: 'Scaffold register found',
	})
	@ApiResponse({
		status: 404,
		description: 'Scaffold register not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async RegisterById(@Param('id') id) {
		const result = await this.register.getScaffoldRegisterById(id)
		return result
	}

	@Get('/tag/:tag_no')
	@ApiOperation({ summary: 'Get scaffold register by tag_no' })
	@ApiResponse({
		status: 200,
		description: 'Scaffold register found',
	})
	@ApiResponse({
		status: 404,
		description: 'Scaffold register not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async RegisterByTag(@Param('tag_no') tag_no) {
		const result = await this.register.getScaffoldRegisterByTagNo(tag_no)
		return result
	}

	@Get('/job/:job_id')
	@ApiOperation({ summary: 'Get scaffold register by jobs_id' })
	@ApiResponse({
		status: 200,
		description: 'Scaffold register found',
	})
	@ApiResponse({
		status: 404,
		description: 'Scaffold register not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async RegisterByJobs(@Param('job_id') job_id) {
		const result = await this.register.getScaffoldRegisterByJobId(job_id)
		return result
	}

	@Post('/:id')
	@ApiOperation({ summary: 'Update scaffold register' })
	@ApiResponse({
		status: 200,
		description: 'Scaffold register updated successfully',
	})
	@ApiResponse({
		status: 404,
		description: 'Scaffold register not found',
	})
	@ApiResponse({
		status: 502,
		description: 'Bad Gateway',
	})
	@HttpCode(200)
	async UpdateRegister(@Param('id') id, @Body() body: Register) {
		const result = await this.register.updateRegister(id, body)
		return result
	}
}
