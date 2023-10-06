import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IAppenateRepository, AppenateObj } from 'domain/appenate'
import fetch from 'node-fetch'

@Injectable()
export class AppenateNet implements IAppenateRepository {
	constructor(private readonly configService: ConfigService) {}
	async AppenateCreateOrUpdateRecords(tableId: string, payload: AppenateObj) {
		const URL = 'https://secure-au.appenate.com:443/api/v2/datasource'
		const IntegrationKey = this.configService.get<string>('APPENATE_ACCESS_KEY')
		const CompanyId = this.configService.get<number>('APPENATE_COMPANY_ID')
		const data = {
			Id: tableId,
			IntegrationKey: IntegrationKey,
			NewRows: payload,
			CompanyId: CompanyId,
		}
		try {
			const res = await fetch(URL, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			if (res.status === 200) {
				return {
					created: true,
				}
			}
			return {
				created: false,
			}
		} catch (error) {
			console.log('error', error)
			return {
				created: false,
			}
		}
	}
}
