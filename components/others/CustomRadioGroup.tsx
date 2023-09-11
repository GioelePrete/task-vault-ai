"use client";

import {RadioGroup} from "@headlessui/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

type Props = {
    title?: string;
    value: any;
    onChange: (value: any) => void;
    config: CustomRadioGroupType[];
};

const CustomRadioGroup = ({title, value, onChange, config}: Props) => {
    return (
        <div className="w-full py-5">
            <div className="mx-auto w-full max-w-md">
                {/* RadioGroup from Headless UI */}
                <RadioGroup value={value} onChange={onChange}>
                    {/* Display title if provided */}
                    {title && (
                        <RadioGroup.Label className="ml-1 pb-50 font-medium text-lg">
                            {title}
                        </RadioGroup.Label>
                    )}
                    <div className="space-y-2 mt-1">
                        {/* Map through config to generate radio options */}
                        {config.map((type: CustomRadioGroupType) => (
                            <RadioGroup.Option
                                key={type.id}
                                value={type.id}
                                className={({active, checked}) =>
                                    `${
                                        active
                                            ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                            : ""
                                    }
                  ${
                                        checked
                                            ? `${type.color} bg-opacity-75 text-white`
                                            : "bg-white"
                                    } 
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({checked}) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    {/* Display radio option name */}
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium ${
                                                            checked ? "text-white" : "text-gray-900"
                                                        }`}
                                                    >
                                                        {type.name}
                                                    </RadioGroup.Label>
                                                    {/* Display radio option description */}
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${
                                                            checked ? "text-white" : "text-gray-500"
                                                        }`}
                                                    >
                                                        <span>{type.description}</span>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {/* Display check mark icon if option is checked */}
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckCircleIcon className="h-6 w-6"/>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default CustomRadioGroup;
