import { Injectable, Inject } from '@nestjs/common'
import { ITaskRepository, Task } from 'domain/task'
import { PostgresAdapter, JobTask as TasksDb } from 'infra/database'

@Injectable()
export class TaskDtb implements ITaskRepository {
	constructor(@Inject(PostgresAdapter) private readonly dtb: PostgresAdapter) {}
	async getAll(): Promise<Task[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const tasks = await db.model(TasksDb).findAll()

			const dataResult = tasks.map((item) => item.toJSON() as Task)
			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getAllByJobId(job_id: number): Promise<Task[]> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const tasks = await db.model(TasksDb).findAll({
				where: {
					job_id: job_id,
				},
			})

			const dataResult = tasks.map((item) => item.dataValues as Task)
			return dataResult
		} catch (error) {
			return Promise.resolve([])
		}
	}
	async getById(id: number): Promise<Task> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const task = await db.model(TasksDb).findByPk(id)
			if (task == null) {
				return Promise.resolve(null)
			}
			const dataResult = task.toJSON() as Task

			return Promise.resolve(dataResult)
		} catch (error) {
			return Promise.resolve(null)
		}
	}
	async create(task: Task): Promise<{ created: boolean; id: number }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const newTask = await db.model(TasksDb).create(task as any)
			const dataResult = newTask.toJSON() as Task
			return Promise.resolve({ created: true, id: dataResult.id })
		} catch (error) {
			return Promise.resolve({ created: false, id: null })
		}
	}
	async update(id: number, task: Task): Promise<{ updated: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const updatedTask = await db.model(TasksDb).update(task as any, {
				where: {
					id: id,
				},
			})
			return Promise.resolve({ updated: true })
		} catch (error) {
			return Promise.resolve({ updated: false })
		}
	}
	async delete(id: number): Promise<{ deleted: boolean }> {
		try {
			const db = await this.dtb.getSequelizeInstance()
			const deletedTask = await db.model(TasksDb).destroy({
				where: {
					id: id,
				},
			})
			return Promise.resolve({ deleted: true })
		} catch (error) {
			return Promise.resolve({ deleted: false })
		}
	}
}
