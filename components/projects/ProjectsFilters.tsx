import React from "react";
import {PlusCircleIcon} from "@heroicons/react/20/solid";
import SearchText from "@/components/others/SearchText";
import Dropdown from "@/components/others/Dropdown";
import {useSimpleDataFetching} from "@/hooks/useSimpleDataFetching";

// Define the props interface for the component
interface Props {
    searchName: string;
    searchOwner: string;
    searchStatus: DropdownOption;
    searchPriority: DropdownOption;
    setProjectModalMode: (projectModalMode: "add" | "edit") => void;
    openProjectModal: () => void;
    setSearchName: (searchName: string) => void;
    setSearchOwner: (searchOwner: string) => void;
    setSearchStatus: (searchStatus: DropdownOption) => void;
    setSearchPriority: (searchPriority: DropdownOption) => void;
}

const ProjectsFilters = ({
                             searchName,
                             searchOwner,
                             searchStatus,
                             searchPriority,
                             setProjectModalMode,
                             openProjectModal,
                             setSearchName,
                             setSearchOwner,
                             setSearchStatus,
                             setSearchPriority
                         }: Props) => {

    const statusData = useSimpleDataFetching("filter/getStatus");
    const priorityData = useSimpleDataFetching("filter/getPriority");

    return (
        <div className="flex space-x-5">
            {/* Add Project Button */}
            <button>
                <PlusCircleIcon className="h-14 w-14 rounded-full text-gray-500" data-testid="add-button"
                                onClick={() => {
                                    // Open the project modal in "add" mode when the button is clicked
                                    setProjectModalMode("add");
                                    openProjectModal();
                                }}
                />
            </button>

            {/* Search by Name */}
            <SearchText placeholder="Search by name.." value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
            />

            {/* Search by Owner */}
            <SearchText placeholder="Search by owner.." value={searchOwner}
                        onChange={(e) => setSearchOwner(e.target.value)}
            />

            {/* Dropdown for Project Status */}
            <Dropdown options={statusData} value={searchStatus} onchange={setSearchStatus}/>

            {/* Dropdown for Project Priority */}
            <Dropdown options={priorityData} value={searchPriority}
                      onchange={setSearchPriority}
            />
        </div>
    );
};

export default ProjectsFilters;
