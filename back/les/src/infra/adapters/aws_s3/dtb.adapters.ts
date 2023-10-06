import { Injectable, Inject } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { IAwsS3Repository } from 'domain/aws_s3/IAWSS3Repository'
import { ResponseModel } from '../../../domain'
import { v4 as uuid } from 'uuid'

@Injectable()
export class AwsS3Adapter implements IAwsS3Repository {
	constructor() {}

	async uploadPublicFile(
		file: Express.Multer.File
	): Promise<ResponseModel<{ url: string; key: string }>> {
		try {
			const s3 = new S3({
				region: String(process.env.AWS_S3_REGION),
				accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
			})

			const fileExtension = file.originalname.split('.').pop()
			const key = `${uuid()}.${fileExtension}`

			const uploadResult = await s3
				.upload({
					Bucket: String(process.env.AWS_S3_BUCKET_NAME),
					Body: file.buffer,
					Key: key,
					ServerSideEncryption: 'AES256',
				})
				.promise()

			return new ResponseModel(200, {
				key: uploadResult.Key,
				url: uploadResult.Location,
			})
		} catch (err) {
			return new ResponseModel(500, { key: null, url: null }, err.message)
		}
	}
}
