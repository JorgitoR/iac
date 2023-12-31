import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FilmIcon } from '@heroicons/react/20/solid'

interface PopoverProps {
	children: React.ReactNode
}

export function Popover({ children }: PopoverProps) {
	return (
		<Menu as="div" className="relative inline-block text-left z-50">
			<div>
				<Menu.Button className="focus:outline-none">
					<FilmIcon className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items className=" origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
					<div className="">
						{/* <p>Filter By</p> */}
						{children}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
