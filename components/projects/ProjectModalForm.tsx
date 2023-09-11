import React from 'react';
import CustomRadioGroup from "@/components/others/CustomRadioGroup";
import {PRIORITY_STATUS, STATUS_TYPES} from "@/utils/constants";

// Define the prop types using TypeScript interfaces
interface Props {
    projectName: string;
    setProjectName: (projectName: string) => void;
    projectProgress: number;
    setProjectProgress: (projectProgress: number) => void;
    projectStatus: StatusType;
    setProjectStatus: (projectStatus: StatusType) => void;
    projectPriority: PriorityType;
    setProjectPriority: (projectPriority: PriorityType) => void;
    projectDescription: string;
    setProjectDescription: (projectDescription: string) => void;
}

const ProjectModalForm = ({
                              projectName,
                              setProjectName,
                              projectProgress,
                              setProjectProgress,
                              projectStatus,
                              setProjectStatus,
                              projectPriority,
                              setProjectPriority,
                              projectDescription,
                              setProjectDescription
                          }: Props) => {
    return (
        <div>
            {/* Input fields for project name and progress */}
            <div className="mt-2 grid grid-cols-2 gap-5">
                <input
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)} // Update the projectName state on input change
                    placeholder="Enter project name.."
                />
                <input
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                    type="number"
                    min={0}
                    max={100}
                    step={5}
                    value={projectProgress}
                    onChange={(e) => setProjectProgress(Number(e.target.value))} // Update the projectProgress state on input change
                    placeholder="Enter project progress in %.."
                />
            </div>

            {/* Radio groups for project status and priority */}
            <div className="grid grid-cols-2 gap-4">
                <CustomRadioGroup
                    title="Status"
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e)} // Update the projectStatus state when radio option changes
                    config={STATUS_TYPES} // Configuring available status options
                />
                <CustomRadioGroup
                    title="Priority"
                    value={projectPriority}
                    onChange={(e) => setProjectPriority(e)} // Update the projectPriority state when radio option changes
                    config={PRIORITY_STATUS} // Configuring available priority options
                />
            </div>

            {/* Input field for project description */}
            <div>
                <input
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                    type="text"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)} // Update the projectDescription state on input change
                    placeholder="Enter project description.."
                />
            </div>
        </div>
    );
};

export default ProjectModalForm;
