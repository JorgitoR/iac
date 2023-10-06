import clsx from 'clsx'
import * as React from 'react'
import { Spinner } from 'common'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant:
		| 'primary'
		| 'inverse'
		| 'danger'
		| 'approve'
		| 'approveInverse'
		| 'declineInverse'
	size: 'xs' | 'sm' | 'md' | 'lg'
	isLoading?: boolean
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
}

const variants: Record<ButtonProps['variant'], string> = {
	primary: 'bg-blue-600 text-white hover:bg-gray-50:text-blue-600',
	inverse: 'bg-white text-blue-600 hover:bg-blue-600:text-white',
	danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600 border-none',
	approve:
		'bg-green-600 text-white hover:bg-green-300:text-green-600 border-none',
	approveInverse: 'border-green-500 hover:bg-green-500 hover:text-white',
	declineInverse: 'border-red-500 hover:bg-red-500 hover:text-white',
}

const sizes: Record<ButtonProps['size'], string> = {
	xs: 'py-1 px-1 text-sm',
	sm: 'py-2 px-2 text-sm',
	md: 'py-2 px-2 text-md',
	lg: 'py-3 px-4 text-lg',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			// eslint-disable-next-line react/prop-types
			type = 'button',
			// eslint-disable-next-line react/prop-types
			className = '',
			variant = 'primary',
			size = 'md',
			isLoading = false,
			startIcon,
			endIcon,
			...props
		},
		ref
	) => (
		<button
			ref={ref}
			type={type}
			className={clsx(
				'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none',
				variants[variant],
				sizes[size],
				className
			)}
			{...props}>
			{isLoading && (
				<div className="w-2 h-2">
					<Spinner />
				</div>
			)}
			{!isLoading && startIcon}
			<span className="mx-2">{props.children}</span> {!isLoading && endIcon}
		</button>
	)
)

Button.displayName = 'Button'
