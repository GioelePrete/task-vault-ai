import {create} from "zustand";
import axios from "axios";
import {BACKEND_BASE_URL} from "@/utils/constants";

// Interface defining the state and actions of the Collaborator feature
interface CollaboratorState {
    collaboratorEmail: string;
    setCollaboratorEmail: (collaboratorEmail: string) => void;

    modalError: string;
    setModalError: (modalError: string) => void;

    // Action to add a collaborator to a project
    addCollaborator: (projectID: number, email: string) => void;

    // Action to delete a collaborator from a project
    deleteCollaborator: (projectID: number, email: string) => void;
}

// Create the Zustand store for Collaborator feature
export const useCollaboratorStore = create<CollaboratorState>((set) => ({
    collaboratorEmail: "",
    setCollaboratorEmail: (collaboratorEmail: string) =>
        set({collaboratorEmail: collaboratorEmail}),

    modalError: "",
    setModalError: (modalError: string) => set({modalError: modalError}),

    // Action to add a collaborator to a project
    addCollaborator: async (projectID: number, email: string) => {
        try {
            // Encode the email as base64 before sending it in the request
            const encodedEmail = Buffer.from(email).toString("base64");
            const response = await axios.post(
                `${BACKEND_BASE_URL}/collaborator/addCollaborator`,
                {
                    projectID: projectID,
                    email: encodedEmail,
                }
            );

            // Update modal error message based on response data
            set({modalError: response.data});

            // If collaborator added successfully, reset collaboratorEmail
            if (response.data === "Collaborator added successfully") {
                set({collaboratorEmail: ""});
            }
        } catch (error) {
            console.error("Error adding a collaborator:", error);
        }
    },

    // Action to delete a collaborator from a project
    deleteCollaborator: async (projectID: number, email: string) => {
        try {
            // Encode the email as base64 before sending it in the request
            const encodedEmail = Buffer.from(email).toString("base64");
            await axios.delete(`${BACKEND_BASE_URL}/collaborator/deleteCollaborator`, {
                params: {
                    projectID: projectID,
                    email: encodedEmail,
                },
            });
        } catch (error) {
            console.error("Error deleting a collaborator:", error);
        }
    },
}));
