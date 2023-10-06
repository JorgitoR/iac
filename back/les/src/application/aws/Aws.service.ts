import { Injectable, Inject } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { v4 as uuid } from 'uuid'
@Injectable()
export class AwsService {
	constructor() {}
	async uploadPublicFile(file: Express.Multer.File) {
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
				})
				.promise()
			return {
				key: uploadResult.Key,
				url: uploadResult.Location,
			}
		} catch (err) {
			return { key: 'error', url: null }
		}
	}
}
