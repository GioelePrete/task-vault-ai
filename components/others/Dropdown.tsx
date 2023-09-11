"use client"

import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/24/solid'

// Define the type for each dropdown option
type DropdownOption = {
    name: string;
};

// Define the props type for the Dropdown component
type Props = {
    options: DropdownOption[];
    value: any; // The currently selected option
    onchange: (value: any) => void; // Callback when an option is selected
}

const Dropdown = ({options, value, onchange}: Props) => {

    return (
        <div className="w-52">
            {/* Listbox component from headless UI */}
            <Listbox value={value} onChange={onchange}>
                <div className="relative">
                    {/* Button that displays the currently selected option */}
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-50 py-2 pl-3 pr-10 text-left shadow-md
                    focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                    focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-14">
                        {/* Display the name of the selected option */}
                        <span className="block truncate text-gray-400 text-base">{value.name}</span>
                        {/* Dropdown icon */}
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    {/* Dropdown options */}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base
                        shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                            {options.map((option: any, index: number) => (
                                // Listbox.Option for each option
                                <Listbox.Option
                                    key={index}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({selected}) => (
                                        <>
                                            {/* Display option name */}
                                            <span
                                                className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {option.name}
                                            </span>
                                            {/* Check icon for selected option */}
                                            {selected ? (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Dropdown;
