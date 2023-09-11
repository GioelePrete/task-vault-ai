import {create} from "zustand";

// Define the interface for the modal state
interface ModalState {

    // Task modal state and functions
    taskModalIsOpen: boolean;
    openTaskModal: (mode: "add" | "edit") => void;
    closeTaskModal: () => void;

    // Failed authentication modal state and functions
    failedAuthModalIsOpen: boolean;
    openFailedAuthModal: () => void;
    closeFailedAuthModal: () => void;

    // Project modal state and functions
    projectModalIsOpen: boolean;
    openProjectModal: () => void;
    closeProjectModal: () => void;

    // Board modal state and functions
    boardModalIsOpen: boolean;
    openBoardModal: () => void;
    closeBoardModal: () => void;

    // Collaborators modal state and functions
    collaboratorsModalIsOpen: boolean;
    openCollaboratorsModal: () => void;
    closeCollaboratorsModal: () => void;

    // State and functions for project modal mode
    projectModalMode: "add" | "edit";
    setProjectModalMode: (projectModalMode: "add" | "edit") => void;

    // State and functions for board modal mode
    boardModalMode: "add" | "edit";
    setBoardModalMode: (boardModalMode: "add" | "edit") => void;

    // State and functions for task modal mode
    taskModalMode: "add" | "edit";
    setTaskModalMode: (taskModalMode: "add" | "edit") => void;
}

// Create the modal store using Zustand
export const useModalStore = create<ModalState>()((set) => ({
    // Task modal state and functions
    taskModalIsOpen: false,
    openTaskModal: (mode) => set({taskModalIsOpen: true, taskModalMode: mode}),
    closeTaskModal: () => set({taskModalIsOpen: false}),

    // Default task modal mode
    taskModalMode: "add",
    setTaskModalMode: (taskModalMode) => set({taskModalMode}),

    // Failed authentication modal state and functions
    failedAuthModalIsOpen: false,
    openFailedAuthModal: () => set({failedAuthModalIsOpen: true}),
    closeFailedAuthModal: () => set({failedAuthModalIsOpen: false}),

    // Collaborators modal state and functions
    collaboratorsModalIsOpen: false,
    openCollaboratorsModal: () => set({collaboratorsModalIsOpen: true}),
    closeCollaboratorsModal: () => set({collaboratorsModalIsOpen: false}),

    // Project modal state and functions
    projectModalIsOpen: false,
    openProjectModal: () => set({projectModalIsOpen: true}),
    closeProjectModal: () => set({projectModalIsOpen: false}),

    // Default project modal mode
    projectModalMode: "add",
    setProjectModalMode: (projectModalMode) => set({projectModalMode}),

    // Board modal state and functions
    boardModalIsOpen: false,
    openBoardModal: () => set({boardModalIsOpen: true}),
    closeBoardModal: () => set({boardModalIsOpen: false}),

    // Default board modal mode
    boardModalMode: "add",
    setBoardModalMode: (boardModalMode) => set({boardModalMode}),
}));
