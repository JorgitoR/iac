import { classNames } from 'utilities'

type Tab = {
	label: string
	id: number
}

type TabsProps = {
	tabIndex: number
	setTabIndex: (index: number) => void
	tabs: Tab[]
}

export function Tabs({ tabIndex, setTabIndex, tabs }: TabsProps) {
	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<select
					id="tabs"
					name="tabs"
					className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					defaultValue={tabs.find((tab) => tabIndex === tab.id)?.label}>
					{tabs.map((tab) => (
						<option key={tab.label} onClick={() => setTabIndex(tab.id)}>
							{tab.label}
						</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<nav className="flex space-x-4 h-12" aria-label="tabs">
					{tabs.map((tab) => (
						<button
							type="button"
							key={tab.label}
							className={classNames(
								tab.id === tabIndex
									? 'border-indigo-500 text-gray-900'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
								'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
							)}
							onClick={() => setTabIndex(tab.id)}
							aria-current={tab.id === tabIndex ? 'page' : undefined}>
							{tab.label}
						</button>
					))}
				</nav>
			</div>
		</div>
	)
}
