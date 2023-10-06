import { Task } from './Task'

export interface ITaskRepository {
	getAll(): Promise<Task[]>
	getAllByJobId(job_id: number): Promise<Task[]>
	getById(id: number): Promise<Task>
	create(task: Task): Promise<{ created: boolean; id: number }>
	update(id: number, task: Task): Promise<{ updated: boolean }>
	delete(id: number): Promise<{ deleted: boolean }>
}
