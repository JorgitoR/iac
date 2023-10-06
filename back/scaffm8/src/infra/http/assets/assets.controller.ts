import {
	Controller,
	Inject,
	Get,
	Post,
	Put,
	Body,
	HttpCode,
	Param,
} from '@nestjs/common'
import { IAssetsService, Asset } from 'domain/assets'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseModel } from 'domain/responseModel'

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
	constructor(
		@Inject('IAssetsService')
		private readonly assetsService: IAssetsService
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all assets' })
	@ApiResponse({
		status: 200,
		description: 'All the assets were obtained successfully.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async getAll(): Promise<ResponseModel<Asset[]>> {
		const assets = await this.assetsService.getAll()
		return assets
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get an asset by id' })
	@ApiResponse({
		status: 200,
		description: 'The asset was obtained successfully.',
	})
	@ApiResponse({
		status: 404,
		description: 'Asset not found.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async getById(@Param('id') id: number): Promise<ResponseModel<Asset>> {
		const asset = await this.assetsService.getById(id)
		return asset
	}

	@Put()
	@ApiOperation({ summary: 'Create an asset' })
	@ApiResponse({
		status: 200,
		description: 'The asset was created successfully.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async create(@Body() asset: any): Promise<
		ResponseModel<{
			created: boolean
		}>
	> {
		const createdAsset = await this.assetsService.create(asset)
		return createdAsset
	}

	@Post(':id')
	@ApiOperation({ summary: 'Update Asset by id' })
	@ApiResponse({
		status: 200,
		description: 'The asset was updated successfully.',
	})
	@ApiResponse({
		status: 404,
		description: 'Asset not found.',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error.',
	})
	async updateById(
		@Param('id') id: number,
		@Body() asset: any
	): Promise<
		ResponseModel<{
			updated: boolean
		}>
	> {
		const updatedAsset = await this.assetsService.update(id, asset)
		return updatedAsset
	}
}
