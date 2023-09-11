// Import the necessary store modules
import {useTaskStore} from "@/store/TaskStore";

// Returns the CSS class for the input border based on error and touch status
export const getInputBorderClassName = (hasError: string | undefined, isTouched: boolean | undefined) => {
    if (hasError && isTouched) {
        return "border-rose-600"; // Apply red border color
    }
    return ""; // No special border class
};

// Extracts a parameter value from the current URL
export const getParamFromLink = (name: string) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
};

// Maps priority levels to corresponding background colors
export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "Very Low":
            return "bg-green-500";
        case "Low":
            return "bg-green-700";
        case "Medium":
            return "bg-yellow-400";
        case "High":
            return "bg-red-500";
        case "Very High":
            return "bg-red-700";
        default:
            return "bg-gray-500";
    }
};

// Maps progress percentage to corresponding background colors
export const getProgressColor = (progress: number) => {
    if (progress <= 25) {
        return "bg-red-500";
    } else if (progress <= 50) {
        return "bg-orange-400";
    } else if (progress <= 75) {
        return "bg-yellow-400";
    } else {
        return "bg-green-500";
    }
};

// Custom hook for managing task-related state and operations
export function useTaskManagement() {
    const [
        addTask,
        newTaskInput,
        setNewTaskInput,
        image,
        setImage,
        newTaskType,
        setNewTaskType,
        board,
        editTask,
        taskID,
        editImageUrl
    ] = useTaskStore((state) => [
        state.addTask,
        state.newTaskInput,
        state.setNewTaskInput,
        state.image,
        state.setImage,
        state.newTaskType,
        state.setNewTaskType,
        state.board,
        state.editTask,
        state.taskID,
        state.editImageUrl
    ]);

    // Retrieves the number of tasks in a column based on its type
    const columnOrder = (type: string) =>
        board.columns.get(type)?.tasks.length;

    // Retrieves the current board ID from the URL parameters
    const currentBoardID = Number(getParamFromLink("board-id"));

    // Return all the relevant values and functions for task management
    return {
        addTask,
        newTaskInput,
        setNewTaskInput,
        image,
        setImage,
        newTaskType,
        setNewTaskType,
        editTask,
        taskID,
        editImageUrl,
        columnOrder,
        currentBoardID
    };
}

// The main function that saves data to a specific store
export const saveDataToStore = (data: BoardData | ProjectData, setters: any) => {
    // Update the store state using the retrieved setters and provided data
    setters.setID(data.id);
    setters.setName(data.name);
    setters.setStatus(data.statusID);
    setters.setPriority(data.priorityID);
    setters.setDescription(data.description);
    setters.setProgress(data.progress);
}
