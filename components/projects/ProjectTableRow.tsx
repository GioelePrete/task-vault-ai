import React from "react";
import {getPriorityColor, getProgressColor, saveDataToStore} from "@/utils/others";
import {ArrowRightCircleIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {FRONTEND_BASE_URL} from "@/utils/constants";
import {useProjectStore} from "@/store/ProjectStore";

interface Props {
    project: ProjectData; // Individual project data
    index: number; // Index of the project in the array
    setProjectModalMode: (projectModalMode: "add" | "edit") => void; // Function to set project modal mode
    openProjectModal: () => void; // Function to open the project modal
    deleteProject: (id: number) => void; // Function to delete a project
}

const ProjectTableRow = ({project, index, setProjectModalMode, openProjectModal, deleteProject}: Props) => {

    // Retrieve the relevant setters from the store
    const projectSetters: Setters = useProjectStore((state) => ({
        setID: state.setProjectID,
        setName: state.setProjectName,
        setStatus: state.setProjectStatus,
        setPriority: state.setProjectPriority,
        setDescription: state.setProjectDescription,
        setProgress: state.setProjectProgress
    }));

    const handleEditClick = () => {
        setProjectModalMode("edit");
        saveDataToStore(project, projectSetters);
        openProjectModal();
    };

    return (
        <tr key={index + 1} className="hover:bg-gray-100">
            <td className="px-6 py-4">{index + 1}</td>
            {/* Display the index */}
            <td className="px-6 py-4">{project.owner}</td>
            {/* Display project owner */}
            <td className="px-6 py-4">{project.name}</td>
            {/* Display project name */}
            <td className="px-6 py-4">{project.description}</td>
            {/* Display project description */}
            <td className="px-6 py-4">{project.status}</td>
            {/* Display project status */}
            <td className="px-6 py-4">
                {/* Display project progress bar */}
                <div className="relative w-full h-4 bg-gray-300 rounded-full">
                    <div
                        className={`absolute h-full rounded-full z-0 ${getProgressColor(
                            project.progress
                        )}`}
                        style={{
                            width: `${project.progress}%`,
                        }}
                    />
                    <div
                        className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-white font-bold">
                        {project.progress}%
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {/* Display project priority with color */}
                <span
                    className={`inline-block rounded-full px-2 py-1 ${getPriorityColor(
                        project.priority
                    )} text-white`}
                >
                    {project.priority}
                </span>
            </td>
            <td className="px-6 py-4 grid grid-cols-3">
                {/* Edit button */}
                <button onClick={handleEditClick}>
                    <PencilSquareIcon className="w-6 h-6 text-gray-500 hover:text-green-500"/>
                </button>
                {/* Delete button */}
                <button onClick={() => deleteProject(project.id)}>
                    <TrashIcon className="w-6 h-6 text-gray-500 hover:text-red-500"/>
                </button>
                {/* View details button */}
                <button data-testid="view-project-button"
                        onClick={() => window.location.href = `${FRONTEND_BASE_URL}/project-interface?project-id=${project.id}&project-name=${project.name}`}>
                    <ArrowRightCircleIcon className="w-7 h-7 text-gray-500 hover:text-yellow-500"/>
                </button>
            </td>
        </tr>
    );
};

export default ProjectTableRow;
