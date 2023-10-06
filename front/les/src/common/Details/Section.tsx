import { ReactElement, isValidElement } from 'react'

interface SectionProps {
	title: string
	content: string | number | Date | null | ReactElement<unknown>
}

export function Section({ title, content }: SectionProps) {
	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">{title}</dt>
			<dd className="mt-1 text-sm text-gray-900">
				{isValidElement(content) ? content : content ? String(content) : ''}
			</dd>
		</div>
	)
}
