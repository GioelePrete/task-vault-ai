import {create} from "zustand";
import axios from "axios";
import {BACKEND_BASE_URL} from "@/utils/constants";

// Define the interface for the Global state
interface ProjectState {
    // Project properties
    projectID: number;
    setProjectID: (projectID: number) => void;

    projectName: string;
    setProjectName: (projectName: string) => void;

    projectStatus: StatusType; // Represents the selected task type (column)
    setProjectStatus: (projectStatus: StatusType) => void; // Sets the selected task type (column)

    projectPriority: PriorityType;
    setProjectPriority: (projectPriority: PriorityType) => void;

    projectDescription: string;
    setProjectDescription: (projectDescription: string) => void;

    projectProgress: number | null;
    setProjectProgress: (projectProgress: number | null) => void;

    // Actions
    addProject: (
        user: string,
        owner: string,
        project: string,
        description: string,
        status: StatusType,
        priority: PriorityType,
        progress: number
    ) => void;
    editProject: (
        id: number,
        project: string,
        description: string,
        status: StatusType,
        priority: PriorityType,
        progress: number
    ) => void;
    deleteProject: (id: number) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    // Default state values
    projectStatus: "notStarted",
    setProjectStatus: (projectStatus: StatusType) => set({projectStatus}),

    projectPriority: "veryLow",
    setProjectPriority: (projectPriority: PriorityType) => set({projectPriority}),

    projectName: "",
    setProjectName: (projectName: string) => set({projectName}),

    projectID: 0,
    setProjectID: (projectID: number) => set({projectID}),

    projectDescription: "",
    setProjectDescription: (projectDescription: string) => set({projectDescription}),

    projectProgress: null,
    setProjectProgress: (projectProgress: number | null) => set({projectProgress}),

    // Action to add a new project
    addProject: async (
        user: string,
        owner: string,
        project: string,
        description: string,
        status: StatusType,
        priority: PriorityType,
        progress: number
    ) => {
        try {
            await axios.post(`${BACKEND_BASE_URL}/project/addProject`, {
                user: user,
                owner: owner,
                name: project,
                description: description,
                status: status,
                progress: progress,
                priority: priority
            });

            // Reset state properties after successful addition
            set({
                projectName: "",
                projectDescription: "",
                projectProgress: null,
                projectStatus: "notStarted",
                projectPriority: "veryLow"
            });
        } catch (error) {
            console.error("Error adding project:", error); // Log the error if any
        }
    },

    // Action to edit an existing project
    editProject: async (
        id: number,
        project: string,
        description: string,
        status: StatusType,
        priority: PriorityType,
        progress: number
    ) => {
        try {
            await axios.put(`${BACKEND_BASE_URL}/project/editProject`, {
                id: id,
                name: project,
                description: description,
                status: status,
                progress: progress,
                priority: priority
            });

            // Reset state properties after successful edit
            set({
                projectName: "",
                projectDescription: "",
                projectProgress: 0,
                projectStatus: "notStarted",
                projectPriority: "veryLow"
            });
        } catch (error) {
            console.error("Error editing project:", error); // Log the error if any
        }
    },

    // Action to delete a project
    deleteProject: async (id: number) => {
        try {
            await axios.delete(`${BACKEND_BASE_URL}/project/deleteProject`, {params: {id: id}});
            console.log("Project deleted successfully");
        } catch (error) {
            console.error("Error deleting project:", error); // Log the error if any
        }
    }
}));
