import Board from "@/components/tasks/Board";
import axios from "axios";
import {BACKEND_BASE_URL} from "@/utils/constants";
import {getParamFromLink} from "@/utils/others";

/**
 * Retrieves tasks from the backend and organizes them into columns grouped by their status.
 * @returns A Promise resolving to a Board object containing tasks grouped by columns.
 */
export const getTasksGroupedByColumn = async (): Promise<Board> => {
    try {
        // Extract the board ID from the URL query parameter
        const boardID = getParamFromLink("board-id");

        // Fetch tasks data from the backend API using axios
        const response = await axios.get<Task[]>(`${BACKEND_BASE_URL}/task/getTasks`, {params: {boardID}});
        const tasksDB = response.data;

        // Organize tasks into columns based on their status
        const columns = tasksDB.reduce((acc, task) => {
            const status = task.status as TypedColumn;

            // If the column doesn't exist in the map, add it
            if (!acc.has(status)) {
                acc.set(status, {
                    id: status,
                    tasks: [],
                });
            }

            // Push the task to the appropriate column's task list
            acc.get(status)!.tasks.push({
                id: task.id,
                boardID: task.boardID,
                title: task.title,
                status: task.status,
                columnOrder: task.columnOrder,
                ...(task.image && {image: task.image}),
            });

            return acc;
        }, new Map<TypedColumn, ColumnType>());

        // Define the order of column types
        const columnTypes: TypedColumn[] = ["todo", "inProgress", "done"];

        // Ensure all column types are present, even if empty
        columnTypes.forEach((columnType) => {
            if (!columns.has(columnType)) {
                columns.set(columnType, {
                    id: columnType,
                    tasks: [],
                });
            }
        });

        // Create a sorted map of columns based on the predefined order
        const sortedColumns = new Map<TypedColumn, ColumnType>(
            columnTypes.map((columnType) => [columnType, columns.get(columnType)!])
        );

        return {
            columns: sortedColumns,
        };
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

/**
 * Fetches data from the backend using the specified endpoint and parameters.
 * @param endpoint The API endpoint to fetch data from.
 * @param params Parameters to include in the request.
 * @returns A Promise resolving to the fetched data.
 */
export const getDataFromDB = async (endpoint: string, params: any) => {
    try {
        // Fetch data from the backend API using axios and provided parameters
        const response = await axios.get(`${BACKEND_BASE_URL}/${endpoint}`, {params: params});
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

/**
 * Fetches simple data from the backend using the specified endpoint.
 * @param endpoint The API endpoint to fetch data from.
 * @returns A Promise resolving to the fetched data.
 */
export const getSimpleDataFromDB = async (endpoint: string) => {
    try {
        // Fetch simple data from the backend API using axios
        const response = await axios.get(`${BACKEND_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching simple data:", error);
        throw error;
    }
}
