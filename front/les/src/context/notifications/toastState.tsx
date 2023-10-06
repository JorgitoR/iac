import { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { NotificationsContext } from './toastContext'

interface IMyProviderProps {
	children: React.ReactNode
}

export const ToastState = (props: IMyProviderProps) => {
	const toast = useRef<Toast>(null)

	const showSuccess = (Message: string) => {
		toast.current?.show({
			severity: 'success',
			summary: 'Success',
			detail: Message,
			life: 4000,
		})
	}

	const showInfo = (Message: string) => {
		toast.current?.show({
			severity: 'info',
			summary: 'Info',
			detail: Message,
			life: 4000,
		})
	}

	const showWarn = (Message: string) => {
		toast.current?.show({
			severity: 'warn',
			summary: 'Warning',
			detail: Message,
			life: 4000,
		})
	}

	const showError = (Message: string) => {
		toast.current?.show({
			severity: 'error',
			summary: 'Error',
			detail: Message,
			life: 4000,
		})
	}

	return (
		<NotificationsContext.Provider
			value={{
				showError,
				showWarn,
				showInfo,
				showSuccess,
			}}>
			{props.children}
			<Toast ref={toast} />
		</NotificationsContext.Provider>
	)
}
