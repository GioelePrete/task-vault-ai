import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";

const CollaboratorTable = ({collaborators, deleteCollaborator}) => {

    return (
        <table className="table-auto w-full">
            {/* Table header */}
            <thead className="bg-gray-300 text-left h-16">
            <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3"></th>
            </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white divide-y divide-gray-200">
            {collaborators.map((collaborator, index) => (
                <tr key={index + 1} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{collaborator.user}</td>
                    <td className="px-6 py-4">{collaborator.email}</td>
                    <td className="px-6 py-4">{collaborator.role}</td>
                    <td className="px-6 py-4 grid grid-cols-2">
                        {/* Button to delete a collaborator */}
                        {collaborator.role === "Collaborator" && (
                            <button aria-label="delete"
                                    onClick={() =>
                                        deleteCollaborator(collaborator.projectID, collaborator.email)
                                    }
                            >
                                {/* Trash icon */}
                                <TrashIcon className="w-6 h-6 text-gray-500 hover:text-red-500"/>
                            </button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CollaboratorTable;