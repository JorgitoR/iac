import {
	Injectable,
	Inject,
	InternalServerErrorException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	AppenateObj,
	IAppenateRepository,
	IAppenateService,
} from 'domain/appenate'
import { IVisitsRepository } from 'domain/visits'
import { IAssetsRepository } from 'domain/assets'
import { IVehiclesRepository } from 'domain/vehicles'
import { ITimesheetsRepository } from 'domain/timesheets'
import { ITaskRepository } from 'domain/task'
import { IStaffRepository } from 'domain/staff'
import { IJobsRepository, Job } from 'domain/jobs'
import { IHandOverRepository } from 'domain/handover'
import { IRegisterRepository } from 'domain/scaffold-register'
import { Client, IClientsRepository } from 'domain/clients'
import { IContactsRepository } from 'domain/contacts'

@Injectable()
export class AppenateService implements IAppenateService {
	constructor(
		private readonly configService: ConfigService,
		@Inject('IAppenateRepository')
		private readonly appenateRepository: IAppenateRepository,
		@Inject('IVisitsRepository')
		private readonly visitsRepository: IVisitsRepository,

		@Inject('IAssetsRepository')
		private readonly assetsRepository: IAssetsRepository,

		@Inject('IVehiclesRepository')
		private readonly vehiclesRepository: IVehiclesRepository,

		@Inject('ITimesheetsRepository')
		private readonly timesheetsRepository: ITimesheetsRepository,

		@Inject('ITaskRepository')
		private readonly taskRepository: ITaskRepository,

		@Inject('IStaffRepository')
		private readonly staffRepository: IStaffRepository,

		@Inject('IRegisterRepository')
		private readonly registerRepository: IRegisterRepository,

		@Inject('IJobsRepository')
		private readonly jobsRepository: IJobsRepository,

		@Inject('IHandoverRepository')
		private readonly handoverRepository: IHandOverRepository,

		@Inject('IClientsRepository')
		private readonly clientsRepository: IClientsRepository,

		@Inject('IContactsRepository')
		private readonly contactsRepository: IContactsRepository
	) {}
	async updateClientsService(payload?: object): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_CONTACTS_ID')
		let clients = null
		if (!payload) {
			clients = await this.clientsRepository.getAll()
		}
		const data: AppenateObj = clients.map((client) => [
			[
				client.id,
				client.name,
				client.phone,
				client.email,
				client.status,
				client.mainContactData.name,
				client.mainContactData.email,
			],
		])

		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)
		if (result.created) {
			return {
				updated: true,
			}
		}

		return {
			updated: false,
		}
	}
	async updateAssetsTable(asset?: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_ASSETS_ID')
		if (!asset) {
			return {
				updated: false,
			}
		}
		const data: AppenateObj = [
			[
				asset.id,
				asset.manufacture_num,
				asset.item_code,
				asset.asset_type,
				asset.last_inspected,
				asset.next_inspection,
				'',
				asset.asset_expiry,
				asset.staffData.staff_name,
				'',
				'',
				'',
				asset.comments,
				asset.make_type,
				'',
				'',
				'',
				asset.status,
			],
		]

		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)

		if (result.created) {
			return {
				updated: true,
			}
		}
		return {
			updated: false,
		}
	}
	async updateVehiclesTable(vehicle?: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_VEHICLES_ID')
		if (!vehicle) {
			return {
				updated: false,
			}
		}
		const data: AppenateObj = [
			[
				vehicle.id,
				vehicle.Rego,
				vehicle.Make,
				vehicle.Model,
				'',
				vehicle.RegoDue,
				vehicle.WOFDate,
				vehicle.Odometer,
				vehicle.Hubometer,
				vehicle.RUC,
				vehicle.ServiceDueDate,
				'',
				vehicle.Status,
			],
		]
		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)

		if (result.created) {
			return {
				updated: true,
			}
		}
		return {
			updated: false,
		}
	}
	async updateTimesheetsTable(payload?: object): Promise<{ updated: boolean }> {
		throw new Error('Method not implemented.')
	}
	async updateTaskTable(task?: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_TASK_ID')
		if (!task) {
			return {
				updated: false,
			}
		}
		const data: AppenateObj = [
			[
				task.id,
				task.job_id,
				task.zone,
				task.zone_label,
				task.type,
				task.description,
				task.complete,
			],
		]
		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)
		if (result.created) {
			return {
				updated: true,
			}
		}

		return {
			updated: false,
		}
	}
	async updateStaffTable(staff?: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_STAFF_ID')

		if (!staff) {
			return {
				updated: false,
			}
		}
		const data: AppenateObj = [
			[staff.staff_id, staff.username, staff.email, staff.pin, staff.status],
		]
		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)
		if (result.created) {
			return {
				updated: true,
			}
		}
		return {
			updated: false,
		}
	}
	async updateRegisterTable(payload?: object): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_REGISTER_ID')
		let register = null
		if (!payload) {
			register = await this.registerRepository.getAll()
		}
		const data: AppenateObj = register.map((register) => [
			register.id,
			register.tag_no,
			register.job_id,
			register.last_inspected,
			register.inspection_due,
			register.status,
		])
		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)
		if (result.created) {
			return {
				updated: true,
			}
		}
		return {
			updated: false,
		}
	}
	async updateJobsTable(payload?: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_JOBS_ID')

		if (!payload) {
			return {
				updated: true,
			}
		}
		const data: AppenateObj = [
			[
				payload.id,
				`${Number(payload.id) + 1000}`,
				`${Number(payload.id) + 1000}` + ' ' + payload.site,
				payload.clientData?.client_name,
				'',
				'',
				'',
				payload.site,
				'',
				payload.status,
				payload.job_status,
			],
		]

		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)

		if (result.created) {
			return {
				updated: true,
			}
		}

		return {
			updated: false,
		}
	}
	async updateHandoverTable(handoverRow?: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_HANDOVER_ID')
		
		if (!handoverRow) {
			return {
				updated: true,
			}
		}
		const data: AppenateObj = [[
			handoverRow?.id,
			handoverRow.job_id,
			handoverRow.hs_officer,
			handoverRow.hs_officer_phone,
			handoverRow.hs_officer_email,
			handoverRow.operation_assignee,
			handoverRow.site_forman,
			handoverRow.site_forman_phone,
			handoverRow.site_forman_email,
		]]


		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)

		if (result.created) {
			return {
				updated: true,
			}
		}

		return {
			updated: false,
		}
	}
	async updateClientsTable(client?: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_CLIENTS_ID')
		if (!client) {
			return {
				updated: false,
			}
		}
		const data: AppenateObj = [
			[
				client.id,
				client.name,
				client.address,
				client.phone,
				client.email,
				client.contact,
				client.status,
			],
		]

		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)

		if (result.created) {
			return {
				updated: true,
			}
		}

		return {
			updated: false,
		}
	}
	async updateVisitsTable(visit: any): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_VISITS_ID')
		if (!visit) {
			return {
				updated: false,
			}
		}
		const data: AppenateObj = [
			[
				visit.id,
				visit.jobData.job_num,
				`Job: ${visit.jobData.job_num} ${visit.jobData.site}`,
				visit.date,
				visit.vehicle_ids,
				visit.vehicle_labels,
				visit.staff_ids,
				visit.staff_labels,
				visit.team_leader_id,
				visit.team_leader,
				visit.task_ids,
				visit.task_labels,
				visit.notes,
				visit.visit_status,
			],
		]
		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)
		if (result.created) {
			return { updated: true }
		}
		return { updated: false }
	}
	async updateContacts(
		client: { client: Client },
		payload: AppenateObj
	): Promise<{ updated: boolean }> {
		const table_id = this.configService.get<string>('APPENATE_VISITS_ID')
		let contacts = null
		if (!payload) {
			contacts = await this.contactsRepository.getAll()
		} else {
			contacts = payload
		}
		const data: AppenateObj = contacts.map((contact) => {
			return [
				client.client.id,
				client.client.client_name,
				client.client.phone,
				client.client.status,
				contact.name,
				contact.email,
				contact.phone,
			]
		})

		const result = await this.appenateRepository.AppenateCreateOrUpdateRecords(
			table_id,
			data
		)
		if (result.created) {
			return { updated: true }
		}
		return { updated: false }
	}
}
