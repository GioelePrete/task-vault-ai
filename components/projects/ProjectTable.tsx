import React from "react";
import ProjectTableRow from "@/components/projects/ProjectTableRow";

// Define the props interface for the component
interface Props {
    projects: ProjectData[];
    setProjectModalMode: (projectModalMode: "add" | "edit") => void;
    openProjectModal: () => void
    deleteProject: (id: number) => void;
}

const ProjectTable = ({projects, setProjectModalMode, openProjectModal, deleteProject}: Props) => {
    return (
        <table className="table-auto w-full">
            {/* Table Header */}
            <thead className="bg-gray-300 text-left h-16">
            <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Progress</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Actions</th>
            </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
            {/* Iterate through each project and render a ProjectTableRow */}
            {projects.map((project: ProjectData, index: number) => (
                <ProjectTableRow
                    key={project.id} // Make sure to provide a unique key for React's reconciliation
                    project={project}
                    index={index}
                    setProjectModalMode={setProjectModalMode}
                    openProjectModal={openProjectModal}
                    deleteProject={deleteProject}
                />
            ))}
            </tbody>
        </table>
    );
};

export default ProjectTable;
