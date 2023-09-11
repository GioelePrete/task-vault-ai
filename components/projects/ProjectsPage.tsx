import React, {useState} from "react";
import ProjectModal from "@/components/projects/ProjectModal";
import {useModalStore} from "@/store/ModalStore";
import {useProjectStore} from "@/store/ProjectStore";
import ProjectTable from "@/components/projects/ProjectTable";
import ProjectsFilters from "@/components/projects/ProjectsFilters";
import {useProjectData} from "@/hooks/useProjectData";

const ProjectsPage = () => {

    // State for filtering projects
    const [searchName, setSearchName] = useState<string>("");
    const [searchOwner, setSearchOwner] = useState<string>("");
    const [searchStatus, setSearchStatus] = useState<DropdownOption>({name: 'All Status'});
    const [searchPriority, setSearchPriority] = useState<DropdownOption>({name: 'All Priority'});

    // State management for project modal
    const [openProjectModal, setProjectModalMode] = useModalStore((state) => [
        state.openProjectModal,
        state.setProjectModalMode
    ]);

    // State management for deleting projects
    const [projectRowsData, setProjectRowsData, deleteProject] = useProjectStore((state) => [state.projectRowsData, state.setProjectRowsData, state.deleteProject]);

    // Fetch data
    const projectsData = useProjectData();

    // Filter projects based on search criteria
    const filteredProjects = projectsData.filter((project: ProjectData) => {
        const nameMatch = project.name.toLowerCase().includes(searchName.toLowerCase());
        const ownerMatch = project.owner.toLowerCase().includes(searchOwner.toLowerCase());
        const statusMatch = searchStatus.name === "All Status" || project.status === searchStatus.name;
        const priorityMatch = searchPriority.name === "All Priority" || project.priority === searchPriority.name;
        return nameMatch && ownerMatch && statusMatch && priorityMatch;
    });

    return (
        <div className="py-8">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between space-x-4 mb-4 items-end">
                    {/* Page title */}
                    <h1 className="text-3xl font-bold text-gray-800 ml-1">Projects</h1>

                    {/* Filters for searching and filtering projects */}
                    <ProjectsFilters
                        openProjectModal={openProjectModal}
                        setProjectModalMode={setProjectModalMode}
                        searchPriority={searchPriority}
                        setSearchStatus={setSearchStatus}
                        searchStatus={searchStatus}
                        searchName={searchName}
                        setSearchName={setSearchName}
                        setSearchPriority={setSearchPriority}
                        searchOwner={searchOwner}
                        setSearchOwner={setSearchOwner}
                    />
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="bg-white border-b border-gray-200">
                        {/* Display the project table */}
                        <ProjectTable
                            projects={filteredProjects}
                            setProjectModalMode={setProjectModalMode}
                            openProjectModal={openProjectModal}
                            deleteProject={deleteProject}
                        />
                    </div>
                </div>
            </div>

            {/* Display the project modal */}
            <ProjectModal/>
        </div>
    );
};

export default ProjectsPage;
