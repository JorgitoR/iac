import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Container, DataTableHeader } from 'common'
import { FolderOpenIcon } from '@heroicons/react/24/solid'
import { Column } from 'primereact/column'
import { DataTableServices, StaffServices } from 'services'
import { FilterMatchMode } from 'primereact/api'
import { tableFilterMatchModeOptions } from 'services/DataTable'
import { DataTable } from 'primereact/datatable'
import { Calendar } from 'primereact/calendar'
import { IStaffRow } from 'models/staff.model'
import { Nullable } from 'primereact/ts-helpers'

interface StaffDataType {
	staff_id: string | undefined
	staff_name: string
	competency: string
	issue_date: Date | null
	expiry_date: Date | null
	assessed_by: string
	[key: string]: Date | string | undefined | null
}

const lookup = {
	'Driver Licence': [
		'endorsement_complete_date',
		'endorsement_expiry',
		'licence_assessed_by',
	],
	'Health & Safety Induction': [
		'induction_date',
		'expiry_date',
		'hs_assessed_by',
	],
	'High Risk Work Licence': [
		'passport_issue',
		'passport_expiry',
		'site_safe_assessed_by',
	],
	'First Aid Certificate': [
		'first_aid_issue',
		'first_aid_expiry',
		'firstaid_assessed_by',
	],
	'Scaffolding Certificate of Competence': [
		'cert_issue_date',
		'cert_expiry_date',
		'scaff_cert_assessed_by',
	],
	'Height Training': [
		'height_training_issue',
		'height_training_expiry',
		'height_training_assessed_by',
	],
}

function convertDate(date: string) {
	const dateParts = date.split('/')
	const month = parseInt(dateParts[1], 10)
	return new Date(+dateParts[2], month, +dateParts[0])
}

function transformData(data: IStaffRow[] | undefined) {
	if (!data) return []
	const result: StaffDataType[] = []
	for (let i = 0; i < data.length; i++) {
		for (const [key, value] of Object.entries(lookup)) {
			const singleData = data[i]
			const [issueProp, expiryProp, assessedByProp] = value as [
				keyof IStaffRow,
				keyof IStaffRow,
				keyof IStaffRow
			]
			const issueDate = singleData[issueProp]
			const expiryDate = singleData[expiryProp]
			result.push({
				staff_id: data[i].id,
				staff_name: data[i]?.staff_name || '',
				competency: key,
				issue_date: issueDate ? convertDate(issueDate.toString()) : null,
				expiry_date: expiryDate ? convertDate(expiryDate.toString()) : null,
				assessed_by: singleData[assessedByProp]?.toString() || '',
			})
		}
	}
	return result
}

export function CompetenciesMain() {
	const { data, isLoading } = StaffServices.useStaff()
	const [competencies, setCompetencies] = useState<StaffDataType[]>([])

	useEffect(() => {
		setCompetencies(transformData(data))
	}, [data])

	const {
		clearFilter,
		filters,
		globalFilterValue,
		setFilters,
		setGlobalFilterValue,
		dataTableReference,
		globalFilterFields,
	} = DataTableServices.useFiltersDataTable({
		initialFilters: [
			{
				filterName: 'competency',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [],
			},
			{
				filterName: 'issue_date',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [],
			},
			{
				filterName: 'expiry_date',
				filterInitialValue: null,
				filterInitialMatchMode: FilterMatchMode.CONTAINS,
				filterOptionsMatchOptions: tableFilterMatchModeOptions.equalsOrNot,
				filterOptions: [],
			},
		],
		aditionalGlobalFilterFields: ['staff_name', 'assessed_by'],
	})

	const header = DataTableHeader({
		clearFilter,
		globalFilterValue,
		filters,
		setFilters,
		setGlobalFilterValue,
		dataTableReference,
	})

	const headerTemplate = (data: StaffDataType) => (
		<td key={`${data?.staff_name}_headerLabel`} colSpan={4}>
			<Link
				key={`details${data.staff_id}`}
				to={`/staff/${data.staff_id}/details`}
				className="flex items-center">
				<FolderOpenIcon className="h-4 w-4 text-gray-500 mr-2" />
				<span className="text-gray-900 font-bold text-xs">
					{data?.staff_name || ''} (Details)
				</span>
			</Link>
		</td>
	)

	const formatDate = (value: Date) => {
		return value.toLocaleDateString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	const dateBodyTemplate = (rowData: Date | null) => {
		if (!rowData) return ''
		return formatDate(rowData)
	}
	const dateFilterTemplate = (options: {
		value: string | Date | Date[] | null | undefined
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		filterCallback: (arg0: Nullable<string | Date | Date[]>, arg1: any) => void
		index: number | string
	}) => {
		return (
			<Calendar
				value={options.value}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				dateFormat="dd/mm/yy"
				placeholder="dd/mm/yyyy"
				mask="99/99/9999"
			/>
		)
	}
	return (
		<div>
			<PageHeading title="Competencies" />

			<Container>
				<div className="mx-auto mt-8">
					<DataTable
						ref={dataTableReference}
						value={competencies}
						loading={isLoading}
						header={header}
						paginator
						paginatorPosition="both"
						showGridlines
						globalFilter={globalFilterValue}
						rows={100}
						sortOrder={1}
						sortField="staff_name"
						rowsPerPageOptions={[100, 300, 500]}
						dataKey="id"
						filters={filters}
						filterDisplay="menu"
						rowGroupMode="subheader"
						groupRowsBy="staff_id"
						rowGroupHeaderTemplate={headerTemplate}
						responsiveLayout="scroll"
						globalFilterFields={globalFilterFields}
						emptyMessage="No competencies found."
						scrollHeight="600px">
						<Column
							header="Competency"
							field="competency"
							style={{ minWidth: '10rem' }}
							filter
							filterMenuStyle={{ width: '14rem' }}
						/>
						<Column
							header="Issue Date"
							field="issue_date"
							style={{ minWidth: '10rem' }}
							body={(row: StaffDataType) => dateBodyTemplate(row.issue_date)}
							filterField="issue_date"
							dataType="date"
							filter
							filterElement={dateFilterTemplate}
						/>
						<Column
							header="Expiry Date"
							field="expiry_date"
							style={{ minWidth: '10rem' }}
							body={(row: StaffDataType) => dateBodyTemplate(row.expiry_date)}
							filterField="expiry_date"
							dataType="date"
							filter
							filterElement={dateFilterTemplate}
						/>
						<Column
							header="Assessed By"
							field="assessed_by"
							style={{ minWidth: '10rem' }}
						/>
					</DataTable>
				</div>
			</Container>
		</div>
	)
}
