import {create} from "zustand";
import axios from "axios";
import {BACKEND_BASE_URL} from "@/utils/constants";

// Defining the structure of the board state
interface BoardState {
    boardID: number;
    setBoardID: (boardID: number) => void;

    boardName: string;
    setBoardName: (boardName: string) => void;

    boardStatus: StatusType;
    setBoardStatus: (boardStatus: StatusType) => void;

    boardPriority: PriorityType;
    setBoardPriority: (boardPriority: PriorityType) => void;

    boardDescription: string;
    setBoardDescription: (boardDescription: string) => void;

    boardProgress: number | null;
    setBoardProgress: (boardProgress: number | null) => void;

    // Functions to interact with the board state
    addBoard: (projectID: number, board: string, description: string, status: StatusType, priority: PriorityType, progress: number) => void;
    editBoard: (id: number, board: string, description: string, status: StatusType, priority: PriorityType, progress: number) => void;
    deleteBoard: (id: number) => void;
}

// Creating a Zustand store to manage board state
export const useBoardStore = create<BoardState>((set) => ({
    // Setting default values for board properties
    boardStatus: "notStarted",
    setBoardStatus: (boardStatus: StatusType) => set({boardStatus}),

    boardPriority: "veryLow",
    setBoardPriority: (boardPriority: PriorityType) => set({boardPriority}),

    boardName: "",
    setBoardName: (boardName: string) => set({boardName}),

    boardID: 0,
    setBoardDescription: (boardDescription: string) => set({boardDescription}),

    boardDescription: "",
    setBoardID: (boardID: number) => set({boardID}),

    boardProgress: null,
    setBoardProgress: (boardProgress: number | null) => set({boardProgress}),

    // Function to add a new board
    addBoard: async (projectID: number, board: string, description: string, status: StatusType, priority: PriorityType, progress: number) => {
        try {
            await axios.post(
                `${BACKEND_BASE_URL}/board/addBoard`, {
                    projectID,
                    name: board,
                    description,
                    status,
                    progress,
                    priority
                }
            );

            // Resetting board state properties after successful addition
            set({boardName: ""});
            set({boardDescription: ""});
            set({boardProgress: null});
            set({boardStatus: "notStarted"});
            set({boardPriority: "veryLow"});

        } catch (error) {
            console.error("Error adding board:", error); // Log the error if any
        }
    },

    // Function to edit an existing board
    editBoard: async (id: number, board: string, description: string, status: StatusType, priority: PriorityType, progress: number) => {
        try {
            await axios.put(
                `${BACKEND_BASE_URL}/board/editBoard`, {
                    id,
                    name: board,
                    description,
                    status,
                    progress,
                    priority
                }
            );

            // Resetting board state properties after successful edit
            set({boardName: ""});
            set({boardDescription: ""});
            set({boardProgress: 0});
            set({boardStatus: "notStarted"});
            set({boardPriority: "veryLow"});

        } catch (error) {
            console.error("Error editing board:", error);
        }
    },

    // Function to delete a board
    deleteBoard: async (id: number) => {
        try {
            await axios.delete(`${BACKEND_BASE_URL}/board/deleteBoard`,
                {params: {id}})
        } catch (error) {
            console.error("Error deleting a board:", error);
        }
    },
}));
