import { classNames } from 'utilities'

interface ButtonProps {
	children: React.ReactNode
	className?: string
	onClickFn?: () => void
	disabled?: boolean
}

export function NavigatePageButton({
	children,
	className,
	onClickFn,
	disabled,
}: ButtonProps) {
	return (
		<button
			type="button"
			className={classNames(
				'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
				className
			)}
			onClick={() => onClickFn && onClickFn()}
			disabled={disabled}>
			{children}
		</button>
	)
}
