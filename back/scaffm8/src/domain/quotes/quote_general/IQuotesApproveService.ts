import { ResponseModel } from 'domain/responseModel'

export interface IApproveQuotesService {
	approveQuote(
		id: number,
		appovedBy: string,
		approveComment: string
	): Promise<ResponseModel<{ quote_approved: boolean }>>
}
