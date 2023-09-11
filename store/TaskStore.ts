import {create} from "zustand";
import {getTasksGroupedByColumn} from "@/utils/database";
import axios from "axios";
import Board from "@/components/tasks/Board";
import {BACKEND_BASE_URL} from "@/utils/constants";

// Define the state interface with all the properties and functions
interface TasksState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;

    searchTaskCard: string;
    setSearchTaskCard: (searchTaskCard: string) => void;

    newTaskInput: string;
    setNewTaskInput: (newTaskInput: string) => void;

    newTaskType: TypedColumn;
    setNewTaskType: (newTaskType: TypedColumn) => void;

    taskID: number;
    setTaskID: (taskID: number) => void;

    image: File | null;
    setImage: (image: File | null) => void;

    editImageUrl: string | null;
    setEditImageUrl: (editImageUrl: string | null) => void;

    addTask: (
        boardID: number,
        task: string,
        columnId: TypedColumn,
        columnOrder: string,
        image?: File | null
    ) => void;

    editTask: (taskID: number, task: string, columnID: TypedColumn) => void;

    deleteTask: (taskIndex: number, task: Task, id: TypedColumn) => void;

    updateColumnInDB: (column: ColumnType) => void;
}

// Create the Zustand store for the board
export const useTaskStore = create<TasksState>((set, get) => ({
        // Initialize the state properties and functions
        board: {
            columns: new Map<TypedColumn, ColumnType>(),
        },

        searchTaskCard: "",
        newTaskInput: "",
        newTaskType: "todo",
        image: null,

        taskID: 0,
        setTaskID: (taskID: number) => set({taskID}),

        editImageUrl: "",
        setEditImageUrl: (editImageUrl: string | null) => set({editImageUrl}),

        setSearchTaskCard: (searchTaskCard) => set({searchTaskCard: searchTaskCard}),

        getBoard: async () => {
            const board = await getTasksGroupedByColumn();
            set({board});
        },

        setBoardState: (board) => set({board}),

        updateColumnInDB: async (column: ColumnType) => {

            try {
                await axios.put(
                    `${BACKEND_BASE_URL}/task/updateColumn`,
                    column
                );
            } catch (error) {
                console.error("Error updating column:", error); // Log the error if any
            }
        },

        deleteTask: async (taskIndex: number, task: Task, id: TypedColumn) => {
            const newColumns = new Map(get().board.columns);
            newColumns.get(id)?.tasks.splice(taskIndex, 1);
            set({board: {columns: newColumns}});

            try {
                await axios.delete(`${BACKEND_BASE_URL}/task/deleteTask`, {
                    params: {
                        id: task.id,
                        image: task.image
                    }
                });
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },

        setNewTaskInput: (newTaskInput: string) => set({newTaskInput}),

        setNewTaskType: (newTaskType: TypedColumn) => set({newTaskType}),

        setImage: (image: File | null) => set({image}),

        addTask: async (
            boardID: number,
            task: string,
            columnId: TypedColumn,
            columnOrder: string,
            image?: File | null
        ) => {
            const formData = new FormData();
            formData.append("boardID", String(boardID));
            formData.append("title", task);
            formData.append("status", columnId);
            formData.append("columnOrder", columnOrder);


            if (image) {
                formData.append("image", image);
            }

            try {
                const response = await axios.post(
                    `${BACKEND_BASE_URL}/task/addTask`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const taskId = response.data.id;
                const imageName = response.data.imageName;

                set({newTaskInput: ""});

                set(() => {
                    const newColumns = new Map(get().board.columns);

                    const newTask: Task = {
                        id: taskId,
                        boardID: boardID,
                        title: task,
                        status: columnId,
                        columnOrder: Number(columnOrder),
                        image: imageName,
                    };

                    const column = newColumns.get(columnId);

                    if (!column) {
                        newColumns.set(columnId, {
                            id: columnId,
                            tasks: [newTask],
                        });
                    } else {
                        newColumns.get(columnId)?.tasks.push(newTask);
                    }

                    return {
                        board: {
                            columns: newColumns,
                        },
                    };
                });
            } catch (error) {
                console.error("Error adding task:", error);
            }
        },
        editTask: async (taskID: number, task: string, columnID: TypedColumn) => {
            try {
                const response = await axios.put(
                    `${BACKEND_BASE_URL}/task/editTask`, {
                        id: taskID,
                        title: task,
                        status: columnID
                    }
                );

                const boardID = response.data.boardID;
                const columnOrder = response.data.columnOrder;
                const imageName = response.data.image;
                const prevStatus = response.data.prevStatus;

                set(() => {
                        const newColumns = new Map(get().board.columns);

                        if (newColumns) {
                            const sourceColumnTasks = newColumns.get(prevStatus)?.tasks;

                            if (sourceColumnTasks) {
                                const taskIndexToRemove = sourceColumnTasks.findIndex((task) => taskID === task.id);

                                if (taskIndexToRemove !== -1) {
                                    sourceColumnTasks.splice(taskIndexToRemove, 1);
                                }
                            }
                        }

                        const newTask: Task = {
                            id: taskID,
                            boardID: boardID,
                            title: task,
                            status: columnID,
                            columnOrder: columnOrder,
                            image: imageName
                        };

                        const column = newColumns.get(columnID);

                        if (!column) {
                            newColumns.set(columnID, {
                                id: columnID,
                                tasks: [newTask],
                            });
                        } else {
                            newColumns.get(columnID)?.tasks.push(newTask);
                        }

                        return {
                            board: {
                                columns: newColumns,
                            },
                        };
                    }
                )
                ;
            } catch (error) {
                console.error("Error editing task:", error);
            }
        }

    }))
;
