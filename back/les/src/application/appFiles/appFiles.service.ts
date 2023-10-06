import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { IAppFilesService, AppFile, IAppFilesRepository } from 'domain/appFiles'
import { IAwsS3Repository } from 'domain/aws_s3/IAWSS3Repository'
import { ResponseModel } from 'domain/responseModel'
@Injectable()
export class AppFilesService implements IAppFilesService {
	constructor(
		@Inject('IAppFilesRepository')
		private readonly appFilesRepository: IAppFilesRepository,
		@Inject('IAwsS3Repository')
		private readonly IAwsS3Repository: IAwsS3Repository
	) {}
	async getAll(): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAll()
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyAssetId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyAssetId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}

	async getAllbyClientsId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyClientsId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyJobId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyJobId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyVisitId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyVisitId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyVehicleId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyVehicleId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async getAllbyTagId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyTagId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}

	async getAllbyStaffId(id: number): Promise<ResponseModel<AppFile[]>> {
		try {
			const result = await this.appFilesRepository.getAllbyStaffId(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}

	async getById(id: number): Promise<ResponseModel<AppFile>> {
		try {
			const result = await this.appFilesRepository.getById(id)
			if (result == null) {
				return Promise.reject(
					new NotFoundException({
						message: 'AppFiles not found',
						data: null,
						code: 404,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles found',
				data: result,
				code: 200,
			})
		} catch (error) {
			return Promise.reject(
				new InternalServerErrorException({
					message: 'Internal Server Error',
					data: null,
					code: 500,
				})
			)
		}
	}
	async create(asset: any): Promise<ResponseModel<{ created: boolean }>> {
		const lookup = {
			'accident-incidents': 'Accidents & Incidents',
			'pre-start': 'Pre Start',
			'handover-cert': 'Handover Certificate',
			'scaff-inspection': 'Scaffold Inspection',
			'close-day': 'Close of Day',
			'daily-forklift': 'Daily Forklift Checklist',
			'harness-inspection': 'Harness Inspection Checklist',
			'accident-investigation': 'Accident Investigation',
			'hoist-inspection': 'Hoist Inspection',
			'lanyard-inspection': 'Lanyard Inspection Checklist',
			'near-miss': 'Near Miss',
			'notice-information': 'Notice of Information',
			'office-inspection': 'Office Inspection',
			'site-inspection': 'Site Inspection Safety Checklist',
			'site-lift': 'Site Lift Plan',
			'vehicle-checklist': 'Vehicle Checklist',
			'delivery-docket': 'Delivery Docket',
			'notes-photos': 'Notes And Photos',
		}
		const data = {
			...asset?.Entry?.AnswersJson?.page1,
			...asset?.Entry?.AnswersJson?.page2,
			...asset?.Entry?.AnswersJson?.page3,
			...asset?.Entry?.AnswersJson?.page4,
		}

		const payloadAppEntries = {
			file_type: lookup[data?.fileType] || '',
			file_description: lookup[data?.fileType] || '',
			file_name: data?.fileID || '',
			job_id: data?.job,
			visit_id: data?.visit_id ? Number(data?.visit_id) : null,
			asset_id: data?.asset_id ? Number(data?.asset_id) : null,
			vehicle_id: data?.vehicle_id ? Number(data?.vehicle_id) : null,
			corrective_actions: data?.corrective ? data?.corrective : null,
			investigation_id: data?.investigation_id
				? Number(data?.investigation_id)
				: null,
			uploaded_by: data?.uploadedBy || data?.user || '',
			link: data?.table?.photoURL || '',
			notes: data?.table || ''
		}
		try {
			const result = await this.appFilesRepository.create(payloadAppEntries)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'AppFiles not created',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles created',
				data: { created: true },
				code: 201,
			})
		} catch (error) {
			return Promise.reject(
				new UnauthorizedException({
					message: 'Unauthorized',
					data: null,
					code: 401,
				})
			)
		}
	}
	async update(
		id: number,
		asset: AppFile
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const result = await this.appFilesRepository.update(id, asset)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'AppFiles not updated',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles updated',
				data: { updated: true },
				code: 201,
			})
		} catch (error) {
			return Promise.reject(
				new UnauthorizedException({
					message: 'Unauthorized',
					data: null,
					code: 401,
				})
			)
		}
	}
	async updateByFileID(
		file: any
	): Promise<ResponseModel<{ updated: boolean }>> {
		try {
			const dataFileUploaded = await this.IAwsS3Repository.uploadPublicFile(file)
			const result = await this.appFilesRepository.updateByFileID(file,dataFileUploaded.data.url)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'AppFiles not updated',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles updated',
				data: { updated: true },
				code: 201,
			})
		} catch (error) {
			return Promise.reject(
				new UnauthorizedException({
					message: 'Unauthorized',
					data: null,
					code: 401,
				})
			)
		}
	}
	async delete(id: number): Promise<ResponseModel<{ deleted: boolean }>> {
		try {
			const result = await this.appFilesRepository.delete(id)
			if (result == null) {
				return Promise.reject(
					new ConflictException({
						message: 'AppFiles not deleted',
						data: null,
						code: 409,
					})
				)
			}
			return Promise.resolve({
				message: 'AppFiles deleted',
				data: { deleted: true },
				code: 201,
			})
		} catch (error) {
			return Promise.reject(
				new UnauthorizedException({
					message: 'Unauthorized',
					data: null,
					code: 401,
				})
			)
		}
	}
}
