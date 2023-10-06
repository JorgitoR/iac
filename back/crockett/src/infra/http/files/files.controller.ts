import {
	Controller,
	Inject,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AwsService } from 'application/aws/Aws.service'
@Controller('files')
export class FilesUploadController {
	constructor(
		@Inject(AwsService)
		private awsService: AwsService
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File) {
		if (!file) throw new Error('No File Uploaded')

		const dataFileUploaded = await this.awsService.uploadPublicFile(file)
		return {
			message: 'File Uploaded Successfully',
			data: dataFileUploaded,
		}
	}
}
