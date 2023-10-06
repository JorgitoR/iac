import { Button, Spinner, Tabs, TextArea } from 'common'
import { QuoteServices, JobsServices } from 'services'
import {
	ZonesForm,
	RatesForm,
	QuoteLinesForm,
	QuoteAdditionalLines,
	Totals,
} from '../FormComponents'
import { useState } from 'react'
import { GeneralInfo } from '../FormComponents/GeneralInfo'
import { RatesAdmin } from '../FormComponents/Rates/RatesAdmin'

interface FormProps {
	quoteID?: number
}

export const Form = ({ quoteID }: FormProps) => {
	const [tabIndex, setTabIndex] = useState(0)

	const { data: quote_data, isLoading: quote_loading } =
		QuoteServices.useQuoteById(quoteID)

	const { data: quote_lines, isLoading: quote_lines_loading } =
		QuoteServices.useQuoteLinesById(quoteID)

	const { data: quote_addons, isLoading: quote_addons_loading } =
		QuoteServices.useQuoteAddonsById(quoteID)

	const { data: quote_zones, isLoading: quote_zones_loading } =
		QuoteServices.useQuoteZonesById(quoteID)

	const { data: quote_rates, isLoading: quote_rates_loading } =
		QuoteServices.useQuoteRatesById(quoteID)

	const { data: jobs_data, isLoading: jobs_loading } = JobsServices.useJobs()

	const {
		formik,
		quoteLinesHandlers,
		quoteAdditionalLinesHandlers,
		ratesHandlers,
		zonesHandlers,
		setBackToMainTable,
		itemsTabs,
	} = QuoteServices.useFormHandler({
		quote_id: quoteID,
		quote_data,
		quote_lines,
		quote_addons,
		quote_rates,
		quote_zones,
	})

	if (
		quote_loading ||
		quote_lines_loading ||
		quote_addons_loading ||
		quote_zones_loading ||
		quote_rates_loading ||
		jobs_loading
	) {
		return <Spinner />
	}

	return (
		<>
			<div className="mx-4 mb-10">
				<div className="w-full">
					<div className="flex">
						<div className="lg:w-4/6 md:w-full sm:w-full">
							<GeneralInfo formik={formik} jobs_data={jobs_data} />
						</div>
						<div className="w-full">
							<div className="w-4/6 mx-auto">
								<div className="flex justify-start mb-4">
									<Tabs
										tabIndex={tabIndex}
										setTabIndex={setTabIndex}
										tabs={itemsTabs}
									/>
								</div>
								{tabIndex === 0 && (
									<ZonesForm
										zones={formik.values.zones}
										zonesHandlers={zonesHandlers}
										errors={formik.errors}
									/>
								)}
								{tabIndex === 1 && (
									<RatesForm
										rates={formik.values.rates}
										ratesHandlers={ratesHandlers}
									/>
								)}
								{tabIndex === 2 && (
									<RatesAdmin
										rates={formik.values.rates}
										ratesHandlers={ratesHandlers}
									/>
								)}
							</div>
						</div>
					</div>

					{formik.values.estimatedWay && (
						<>
							<QuoteLinesForm
								zones={formik.values.zones}
								rates={formik.values.rates}
								quoteLines={formik.values.quote_lines}
								quoteLinesHandlers={quoteLinesHandlers}
								estimatedWayOption={formik.values.estimatedWay}
							/>

							<QuoteAdditionalLines
								rates={formik.values.rates}
								additionalLines={formik.values.quote_additional_lines}
								additionalLinesHandlers={quoteAdditionalLinesHandlers}
							/>

							<div className="w-3/6">
								<TextArea
									title="Additional Conditions"
									id="terms"
									placeholder="Additional Conditions"
									handleBlur={formik.handleBlur}
									handleChange={formik.handleChange}
									type="text"
									value={formik.values.terms}
									error={formik.errors.terms}
									rows={10}
								/>
							</div>

							<Totals
								erectDismantleTotal={formik.values.erectDismantleTotal}
								additionalTotal={formik.values.additionalTotal}
								weekTotal={formik.values.weekTotal}
								total={formik.values.total}
							/>

							{quoteID && (
								<div className="pl-2 mt-6 flex space-x-4">
									<Button
										onClick={() => {
											setBackToMainTable(true)
											formik.handleSubmit()
										}}
										type="submit"
										form="quoteForm"
										//isLoading={quoteCreating}
										size="sm"
										variant={'primary'}>
										Save & Exit
									</Button>
									<Button
										onClick={() => formik.handleSubmit()}
										type="submit"
										form="quoteForm"
										size="sm"
										variant={'primary'}>
										Save & View
									</Button>
								</div>
							)}
							{!quoteID && (
								<div className="pl-2 mt-6">
									<Button
										onClick={() => formik.handleSubmit()}
										type="submit"
										form="quoteForm"
										size="sm"
										variant={'primary'}>
										Create Quote
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</>
	)
}
