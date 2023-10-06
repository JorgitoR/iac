import { createContext } from 'react'

interface IContextProps {
	showError: (Message: string) => void
	showWarn: (Message: string) => void
	showInfo: (Message: string) => void
	showSuccess: (Message: string) => void
}

export const NotificationsContext = createContext<IContextProps>({
	showError: () => null,
	showWarn: () => null,
	showInfo: () => null,
	showSuccess: () => null,
})
