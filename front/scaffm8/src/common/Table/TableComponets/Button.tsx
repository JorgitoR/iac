import { classNames } from 'utilities'

interface ButtonProps {
	children: React.ReactNode
	className?: string
	onClickFn?: () => void
	disabled?: boolean
}

export function PaginationBtn({
	children,
	className,
	onClickFn,
	disabled,
}: ButtonProps) {
	return (
		<button
			type="button"
			className={classNames(
				'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
				className
			)}
			onClick={() => onClickFn && onClickFn()}
			disabled={disabled}>
			{children}
		</button>
	)
}
