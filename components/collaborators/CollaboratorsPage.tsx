import React, {useState} from "react";
import SearchText from "@/components/others/SearchText";
import {PlusCircleIcon} from "@heroicons/react/20/solid";
import {getParamFromLink} from "@/utils/others";
import {useModalStore} from "@/store/ModalStore";
import {useCollaboratorStore} from "@/store/CollaboratorStore";
import CollaboratorTable from "@/components/collaborators/CollaboratorTable";
import CollaboratorsModal from "@/components/collaborators/CollaboratorsModal";
import {useDataFetching} from "@/hooks/useDataFetching";

const CollaboratorsPage = () => {
    // State to hold the search name for filtering
    const [searchName, setSearchName] = useState<string>("");

    // Get utility functions and states
    const openCollaboratorsModal = useModalStore((state) => state.openCollaboratorsModal);
    const deleteCollaborator = useCollaboratorStore((state) => state.deleteCollaborator);

    // Get the current project name from the URL parameter
    const currentProjectName = getParamFromLink('project-name');

    // Get the collaborators' data from utilities
    const collaboratorsData = useDataFetching("collaborator/getCollaborators");

    // Filter collaborators based on the searchName
    const filteredCollaborators = collaboratorsData.filter((collaborator) =>
        collaborator.user.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div className="w-2/4 mx-auto py-10">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between space-x-4 mb-4 items-end">
                    {/* Display the current project name */}
                    <h1 className="text-3xl font-bold text-gray-800 ml-1">{currentProjectName}</h1>

                    <div className="flex space-x-5">
                        {/* Button to open the CollaboratorsModal */}
                        <button>
                            <PlusCircleIcon className="h-14 w-14 rounded-full text-gray-500"
                                            onClick={openCollaboratorsModal}/>
                        </button>

                        {/* Search input for filtering collaborators */}
                        <SearchText placeholder="Search by name.." value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}/>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="bg-white border-b border-gray-200">
                        {/* Render the CollaboratorTable component with filtered collaborators */}
                        <CollaboratorTable
                            collaborators={filteredCollaborators}
                            deleteCollaborator={deleteCollaborator}
                        />
                    </div>
                </div>
            </div>
            {/* Render the CollaboratorsModal */}
            <CollaboratorsModal/>
        </div>
    );
};

export default CollaboratorsPage;
