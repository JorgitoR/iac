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
import { ITaskService, Task } from 'domain/task'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Tasks')
@Controller('jobs/:job_id/tasks')
export class TasksController {
	constructor(
		@Inject('ITasksService')
		private readonly taskService: ITaskService
	) {}

	@Get('/all')
	@ApiOperation({ summary: 'Get all tasks' })
	@ApiResponse({ status: 200, description: 'OK' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	async getAll() {
		try {
			const tasks = await this.taskService.getAll()
			return tasks
		} catch (error) {
			return error
		}
	}

	@Get()
	@ApiOperation({ summary: 'Get all tasks by job id' })
	@ApiResponse({ status: 200, description: 'OK' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	async getAllByJobID(@Param('job_id') job_id: number) {
		try {
			const tasks = await this.taskService.getAllByJobID(job_id)
			return tasks
		} catch (error) {
			return error
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a task by id' })
	@ApiResponse({ status: 200, description: 'OK' })
	@ApiResponse({ status: 404, description: 'Task not Found' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	async getById(@Param('id') id: number) {
		try {
			const response = await this.taskService.getById(id)
			return response
		} catch (error) {
			return error
		}
	}

	@Put()
	@ApiOperation({ summary: 'Create a task' })
	@ApiResponse({ status: 200, description: 'Task Created' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	async create(@Param('job_id') job_id: number, @Body() task: any) {
		try {
			const result = await this.taskService.create(job_id, task as Task)
			return result
		} catch (error) {
			return error
		}
	}

	@Put('/variation')
	@ApiOperation({ summary: 'Create a variation task' })
	@ApiResponse({ status: 200, description: 'Variation Task Created' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	async createVariation(@Param('job_id') job_id: number, @Body() task: any) {
		try {
			const result = await this.taskService.createVariation(
				job_id,
				task as Task
			)
			return result
		} catch (error) {
			return error
		}
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update a task' })
	@ApiResponse({ status: 200, description: 'Task Updated' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	async update(@Param('id') id: number, @Body() task: any) {
		const result = await this.taskService.update(id, task as Task)
		return result
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a task' })
	@ApiResponse({ status: 200, description: 'Task Deleted' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	async delete(@Param('id') id: number) {
		const result = await this.taskService.delete(id)
		return result
	}
}
