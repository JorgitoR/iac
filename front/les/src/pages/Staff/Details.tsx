import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { TwoColumnDetails, Section } from 'common/Details'
import { Tabs, Spinner, ErrorComponent } from 'common'
import { StaffServices } from 'services'
import { AppRoutes } from 'config'
import { Notes } from 'components/Notes'

export const DetailsPage = () => {
	const [tabIndex, setTabIndex] = useState(0)

	const { id } = useParams()
	const location = useLocation()

	const { data, error, isLoading, enableCreateUpdate } =
		StaffServices.useStaffById(id)

	const items = [
		{ label: 'Notes & Files', id: 0 },
		{ label: 'Leave', id: 1 },
	]

	if (isLoading) {
		return (
			<div className="w-full h-48 flex justify-center items-center">
				<Spinner />
			</div>
		)
	}

	if (error) {
		return <ErrorComponent />
	}

	return (
		<div className="w-full mx-auto mt-8 mb-28">
			{data && (
				<TwoColumnDetails
					heading="Staff Details"
					editBtn="Edit Staff"
					isEditable={enableCreateUpdate}
					editLink={{
						to: AppRoutes.privateRoutes.StaffEdit.replace(':id', id || ''),
						state: { background: location, name: 'editStaff' },
					}}>
					<Section title="Staff Name" content={data.staff_name} />
					<Section title="Date of Birth" content={data.dob} />
					<Section title="Start Date" content={data.start_date} />
					<Section title="Address" content={data.street} />
					<Section title="Contact #" content={data.mobile} />
					<Section title="Email" content={data.email} />
					<Section title="Status" content={data.status} />
					<Section title="" content="" />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Driver Licence
					</h2>
					<div />
					<Section title="Licence Number" content={data.driver_licence} />
					<Section title="Licence Type" content={data.licence_type} />
					<Section title="Licence Class" content={data.licence_class2} />
					<Section title="Endorcement" content={data.endorsement} />
					<Section
						title="Completion Date"
						content={data.endorsement_complete_date}
					/>
					<Section title="Expiry Date" content={data.endorsement_expiry} />
					<div>
						<h4 className="text-sm font-medium text-gray-500">Photo Front</h4>
						<img
							className="object-contain w-56"
							alt={data?.photo_front || ''}
							src={data?.photo_front || ''}
						/>
					</div>
					<div>
						<h4 className="text-sm font-medium text-gray-500">Photo Back</h4>
						<img
							className="object-contain w-56"
							alt={data?.photo_back || ''}
							src={data?.photo_back || ''}
						/>
					</div>

					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Health and Safety Induction
					</h2>
					<div />
					<Section title="Induction Date" content={data.induction_date} />
					<Section title="Expiry Date" content={data.expiry_date} />
					<div>
						<h4 className="text-sm font-medium text-gray-500">Photo</h4>
						<img
							className="object-contain w-56"
							alt={data?.photo || ''}
							src={data?.photo || ''}
						/>
					</div>
					<div />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						High Risk Work Licence
					</h2>
					<div />
					<Section title="Passport Number" content={data.passport_num} />
					<Section title="Type" content={data.passport_type} />
					<Section title="Issue Date" content={data.passport_issue} />
					<Section title="Expiry Date" content={data.passport_expiry} />
					<div>
						<h4 className="text-sm font-medium text-gray-500">
							Passport Photo
						</h4>
						<img
							className="object-contain w-56"
							alt={data?.passport_photo || ''}
							src={data?.passport_photo || ''}
						/>
					</div>
					<div />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						First Aid Certificate
					</h2>
					<div />
					<Section title="Issue Date" content={data.first_aid_issue} />
					<Section title="Expiry Date" content={data.first_aid_expiry} />
					<div>
						<h4 className="text-sm font-medium text-gray-500">
							First Aid Photo
						</h4>
						<img
							className="object-contain w-56"
							alt={data?.first_aid_photo || ''}
							src={data?.first_aid_photo || ''}
						/>
					</div>
					<div />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Scaffolding Certificate of Competence
					</h2>
					<div />
					<Section title="Certificate Number" content={data.cert_num} />
					<Section title="Issue Date" content={data.cert_issue_date} />
					<Section title="Expiry Date" content={data.cert_expiry_date} />
					<div>
						<h4 className="text-sm font-medium text-gray-500">Photo</h4>
						<img
							className="object-contain w-56"
							alt={data?.cert_photo || ''}
							src={data?.cert_photo || ''}
						/>
					</div>

					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Safe Operating Procedure
					</h2>
					<div />
					<Section title="SOP Training" content={data.sop_train} />
					<div />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Next Of Kin
					</h2>
					<div />
					<Section title="Name" content={data.next_of_kin_name} />
					<Section title="Phone Number" content={data.next_of_kin_phone} />
					<Section title="Email" content={data.next_of_kin_email} />
					<div />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Scaffold Certificate
					</h2>
					<div />
					<div>
						<h4 className="text-sm font-medium text-gray-500">Photo</h4>
						<img
							className="object-contain w-56"
							alt={data?.scaffold_certificate_photo || ''}
							src={data?.scaffold_certificate_photo || ''}
						/>
					</div>
					<div />
					<h2 className="py-2 text-lg font-medium leading-5 tracking-wide">
						Other
					</h2>
					<div />
					<Section title="Height Training" content={data.height_training} />
					<Section
						title="Height Training Expiry"
						content={data.height_training_expiry}
					/>
					<div>
						<h4 className="text-sm font-medium text-gray-500">Photo</h4>
						<img
							className="object-contain w-56"
							alt={data?.other_photo || ''}
							src={data?.other_photo || ''}
						/>
					</div>
					<Section title="IRD #" content={data.ird_num} />
					<Section
						title="Last Drug Test - Date"
						content={data.last_drug_test}
					/>
					<Section title="Kiwisaver" content={data.kiwisaver} />
					<Section
						title="Employement Contract"
						content={data.employement_contract}
					/>
					<div />
				</TwoColumnDetails>
			)}
			<div className="px-8">
				<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} tabs={items} />
			</div>
			{tabIndex === 0 && <Notes type="staff" id={id || ''} />}

			{tabIndex === 1 && <div>Tab For Leave</div>}
		</div>
	)
}
