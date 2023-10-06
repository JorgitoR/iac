import clsx from 'clsx'
import {
	ExclamationCircleIcon,
	InformationCircleIcon,
} from '@heroicons/react/24/outline'
import * as React from 'react'

import { Button } from '../Button'
import { Dialog, DialogTitle } from '../Dialog'

type ConfirmationDialogProps = {
	children?: React.ReactNode
	triggerButton: React.ReactElement
	confirmButton: React.ReactElement
	title: string
	body?: string
	cancelButtonText?: string
	icon?: 'danger' | 'info'
	isDone?: boolean
	size?: keyof typeof sizes
}

const sizes = {
	xl: 'sm:max-w-xl',
	'2xl': 'sm:max-w-2xl',
	'3xl': 'sm:max-w-3xl',
	'4xl': 'sm:max-w-4xl',
	'5xl': 'sm:max-w-5xl',
}

export const ConfirmationDialog = ({
	children,
	triggerButton,
	confirmButton,
	title,
	body = '',
	cancelButtonText = 'Cancel',
	icon = 'danger',
	isDone = false,
	size = 'xl',
}: ConfirmationDialogProps) => {
	const [isOpen, setIsOpen] = React.useState(false)

	const open = React.useCallback(() => setIsOpen(true), [])
	const close = React.useCallback(() => setIsOpen(false), [])

	const cancelButtonRef = React.useRef<HTMLButtonElement>(null)

	React.useEffect(() => {
		if (isDone) {
			close()
		}
	}, [isDone, close])

	const trigger = React.cloneElement(triggerButton, {
		onClick: open,
	})

	function handleConfirmClick() {
		confirmButton.props.onClick()
		close()
	}

	return (
		<>
			{trigger}
			<Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
				<div
					className={clsx(
						'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-6',
						sizes[size]
					)}>
					<div className="sm:flex sm:items-start">
						{icon === 'danger' && (
							<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<ExclamationCircleIcon
									className="h-6 w-6 text-red-600"
									aria-hidden="true"
								/>
							</div>
						)}

						{icon === 'info' && (
							<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
								<InformationCircleIcon
									className="h-6 w-6 text-blue-600"
									aria-hidden="true"
								/>
							</div>
						)}
						<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<DialogTitle
								as="h3"
								className="text-xl leading-6 font-medium text-gray-700">
								{title}
							</DialogTitle>
							{body && (
								<div className="mt-2">
									<p className="text-sm text-gray-500">{body}</p>
								</div>
							)}
						</div>
					</div>
					{children}
					<div className="mt-4 flex space-x-2 justify-end items-center">
						<Button
							type="button"
							size="sm"
							variant="inverse"
							// className="w-full inline-flex justify-center rounded-md border focus:ring-1 focus:ring-offset-1 focus:ring-indigo-
							onClick={close}
							ref={cancelButtonRef}>
							{cancelButtonText}
						</Button>
						{React.cloneElement(confirmButton, { onClick: handleConfirmClick })}
					</div>
				</div>
			</Dialog>
		</>
	)
}
