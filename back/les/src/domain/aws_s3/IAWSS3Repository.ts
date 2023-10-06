import { ResponseModel } from 'domain/responseModel'

export interface IAwsS3Repository {
	uploadPublicFile(
		file: Express.Multer.File
	): Promise<ResponseModel<{ url: string; key: string }>>
}
