import { useNavigate } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import { MenuItem } from 'primereact/menuitem'
import { useSelector } from 'react-redux'
import { AppStore } from 'redux/store'

import * as logo from 'assets/logo.png'
import { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { AppRoutes } from 'config'

// use the redux user to get the user name

export const Navbar = () => {
	const navigator = useNavigate()
	const userState = useSelector((store: AppStore) => store.user)

	const items: MenuItem[] = [
		// Jobs Dropdown
		{
			label: 'Jobs',
			//icon: 'pi pi-fw pi-file',
			items: [
				{
					label: 'Jobs',
					command: () => {
						navigator(AppRoutes.privateRoutes.Jobs)
					},
				},
				{
					label: 'Visits',
					command: () => {
						navigator(AppRoutes.privateRoutes.visits)
					},
				},
				{
					label: 'Job Scheduler',
					command: () => {
						navigator(AppRoutes.privateRoutes.JobScheduler)
					},
				},
				{
					label: 'Staff Scheduler',
					command: () => {
						navigator('/staffScheduler')
					},
				},
			],
		},
		// Staff Dropdown
		{
			label: 'Staff',
			//icon: 'pi pi-fw pi-file',
			items: [
				{
					label: 'Staff',
					command: () => {
						navigator(AppRoutes.privateRoutes.Staff)
					},
				},
				{
					label: 'Competencies',
					command: () => {
						navigator(AppRoutes.privateRoutes.StaffCompetencies)
					},
				},
				{
					label: 'Timesheets',
					command: () => {
						navigator(AppRoutes.privateRoutes.timesheets)
					},
				},
				{
					label: 'Approved Timesheets',
					command: () => {
						navigator(AppRoutes.privateRoutes.timesheetsApproved)
					},
				},
				{
					label: 'Leave',
					command: () => {
						navigator(AppRoutes.privateRoutes.leave)
					},
				},
				{
					label: 'Approved Leave',
					command: () => {
						navigator(AppRoutes.privateRoutes.LeaveApproved)
					},
				},
			],
		},
		// Assests Dropdown
		{
			label: 'Assets',
			//icon: 'pi pi-fw pi-file',
			items: [
				{
					label: 'Assets',
					command: () => {
						navigator(AppRoutes.privateRoutes.Assets)
					},
				},
				{
					label: 'Vehicles',
					command: () => {
						navigator(AppRoutes.privateRoutes.Vehicles)
					},
				},
			],
		},
		// Clients Option
		{
			label: 'Clients',
			command: () => {
				navigator(AppRoutes.privateRoutes.Clients)
			},
		},
		// Scaffold Register Option
		{
			label: 'Scaffold Register',
			command: () => {
				navigator(AppRoutes.privateRoutes.scaffoldRegister)
			},
		},
		// Quote Option
		{
			label: 'Quote',
			command: () => {
				navigator(AppRoutes.privateRoutes.Quotes)
			},
		},
		// Reports Dropdown
		{
			label: 'Reports',
			icon: 'pi pi-fw pi-file',
			items: [
				{
					label: 'Files',
					command: () => {
						navigator(AppRoutes.privateRoutes.AppFiles)
					},
				},
				{
					label: 'Investigation reports',
					command: () => {
						navigator(AppRoutes.privateRoutes.InvestigationReports)
					},
				},
			],
		},
		// Invoices Option
		{
			label: 'Invoices',
			items: [
				{
					label: 'Invoices',
					command: () => {
						navigator(AppRoutes.privateRoutes.Invoices)
					},
				},
				{
					label: 'Approved Invoices',
					command: () => {
						navigator(AppRoutes.privateRoutes.InvoicesApproved)
					},
				},
			],
		},
	]

	const start = <img className="mr-9 h-9" src={logo.default} alt="Logo" />

	if (!userState.name) {
		return <></>
	}

	return (
		<Menubar
			model={items}
			start={start}
			end={() => PopupEnd({ navigator, token: userState.accessToken })}
			className="bg-gray-900 text-white"
		/>
	)
}

interface PopupEndProps {
	navigator: ReturnType<typeof useNavigate>
	token: string
}

function PopupEnd({ navigator, token }: PopupEndProps) {
	const menu = useRef<Menu>(null)
	const toast = useRef<Toast>(null)
	const items: MenuItem[] = [
		{
			label: 'Change Password',
			icon: 'pi pi-user-edit',
			command: () =>
				navigator(
					AppRoutes.publicRoutes.SetPasswordReset.replace(':token', token)
				),
		},
		{
			label: 'Sign Out',
			icon: 'pi pi-sign-out',
			command: () => navigator(AppRoutes.publicRoutes.Login),
		},
	]

	return (
		<div className="card flex justify-content-center">
			<Toast ref={toast}></Toast>
			<Menu model={items} popup ref={menu} />
			<Button
				className="p-button-rounded"
				icon="pi pi-user"
				onClick={(e) => menu.current?.toggle(e)}
			/>
		</div>
	)
}
