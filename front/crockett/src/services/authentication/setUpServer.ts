import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotificationsContext } from 'context/notifications/toastContext'
import useApi from 'services/api/fetchData'
import { AppRoutes } from 'config'
import { IStaffRow, StaffStatus, StaffType } from 'models/staff.model'

export const useSetupServer = () => {
	const navigator = useNavigate()
	const { showSuccess, showError } = useContext(NotificationsContext)
	const { putRequest } = useApi()

	/* 	useEffect(() => {
		getRequest(AppRoutes.serverAuthRoutes.checkEnableConfig)
			.then((response) => {
				if (!response) {
					navigator(AppRoutes.privateRoutes.Dashboard)
				}
			})
			.catch(() => {
				navigator(AppRoutes.privateRoutes.Dashboard)
			})
	}, []) */

	const createUser = async (userEmail: string, userName: string) => {
		try {
			const payload: IStaffRow = {
				userType: 'Admin',
				accessToPortal: 'Yes',
				accessToMobile: 'Yes',
				staff_name: userName,
				type: 'Employee' as StaffType,
				mobile: '',
				email: userEmail,
				position: '',
				street: '',
				street_2: '',
				city: '',
				post_code: '',
				pin: '',
				start_date: '',
				dob: '',
				driver_licence: '',
				licence_type: '',
				licence_class2: '',
				endorsement: '',
				endorsement_complete_date: '',
				endorsement_expiry: '',
				photo_front: '',
				photo_back: '',
				licence_assessed_by: '',
				induction_date: '',
				expiry_date: '',
				photo: '',
				hs_assessed_by: '',
				passport_num: '',
				passport_type: '',
				passport_issue: '',
				passport_expiry: '',
				passport_photo: '',
				site_safe_assessed_by: '',
				first_aid_issue: '',
				first_aid_expiry: '',
				first_aid_photo: '',
				firstaid_assessed_by: '',
				cert_num: '',
				cert_issue_date: '',
				cert_expiry_date: '',
				cert_photo: '',
				scaff_cert_assessed_by: '',
				sop_train: '',
				height_training: '',
				height_training_issue: '',
				height_training_expiry: '',
				height_training_assessed_by: '',
				other_photo: '',
				ird_num: '',
				last_drug_test: '',
				kiwisaver: '',
				employement_contract: '',
				status: StaffStatus.Active,
			}
			await putRequest(AppRoutes.serverStaffRoutes.createStaff, payload)

			showSuccess('First User Created successful Now Login')
			navigator('/dashboard')
		} catch (error) {
			showError('Something went wrong with the server check the logs')
		}
	}

	return { createUser }
}
