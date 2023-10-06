import { Module } from '@nestjs/common'
import { FilesUploadController } from 'infra/http/files/files.controller'
import { AwsService } from 'application/aws/Aws.service'
@Module({
	imports: [],
	controllers: [FilesUploadController],
	providers: [AwsService],
})
export class AWSS3Module {}
