import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import {
	IQuoteZonesService,
	IQuoteZonesRepository,
	QuoteZone,
} from 'domain/quotes/quote_zones'
import { ResponseModel } from 'domain/responseModel'

@Injectable()
export class QuoteZonesService implements IQuoteZonesService {
	constructor(
		@Inject('IQuoteZonesRepository')
		private readonly quoteZonesRepository: IQuoteZonesRepository
	) {}
	async getAllbyQuoteID(quote_id: number): Promise<ResponseModel<QuoteZone[]>> {
		const quote_zones = await this.quoteZonesRepository.getAllbyQuoteID(
			quote_id
		)

		if (!quote_zones) {
			throw new NotFoundException('Quote Zones not found')
		}
		return {
			code: 200,
			message: 'Quote Zones found',
			data: quote_zones,
		}
	}
	async create(
		quote_id: number,
		quote_zones: QuoteZone[]
	): Promise<ResponseModel<{ created: boolean }>> {
		for (const iterator of quote_zones) {
			const quote_zone = await this.quoteZonesRepository.create({
				...iterator,
				quote_id,
			})
			if (!quote_zone) {
				throw new ConflictException('Quote Zone not created')
			}
		}
		return {
			code: 200,
			message: 'Quote Zones created',
			data: { created: true },
		}
	}
	async update(
		quote_id: number,
		quote_zones: QuoteZone[]
	): Promise<ResponseModel<{ updated: boolean }>> {
		for (const iterator of quote_zones) {
			if (iterator.id) {
				const quote_zone_db = await this.quoteZonesRepository.update(
					iterator.id,
					iterator
				)
				if (!quote_zone_db) {
					throw new NotFoundException('Quote Zone not found')
				}
			} else {
				const quote_zone_db = await this.quoteZonesRepository.create({
					...iterator,
					quote_id,
				})
				if (!quote_zone_db) {
					throw new ConflictException('Quote Zone not created')
				}
			}
		}
		return {
			code: 200,
			message: 'Quote Zones updated',
			data: { updated: true },
		}
	}
}
