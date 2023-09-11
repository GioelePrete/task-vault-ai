import {Task} from "../types/customTypes";
import {getAllQuery, getQuery, runQuery} from "./mainDB";

/**
 * Retrieves tasks associated with a specific board by board ID.
 *
 * @param boardID - The ID of the board for which to retrieve tasks.
 * @returns A Promise that resolves to an array of tasks.
 * @throws Throws an error if there's an issue with the database query.
 */
export const getTasksByBoardID = async (boardID: number): Promise<Task[]> => {
    const query = 'SELECT * FROM tasks WHERE boardID = ?';
    try {
        return await getAllQuery<Task[]>(query, [boardID]);
    } catch (error) {
        throw error;
    }
};

/**
 * Adds a new task to the database.
 *
 * @param boardID - The ID of the board to which the task belongs.
 * @param title - The title of the task.
 * @param status - The status code of the task.
 * @param columnOrder - The order of the task within its column.
 * @param imageFilename - The filename of an associated image (or null).
 * @returns A Promise that resolves to the ID of the newly added task.
 * @throws Throws an error if there's an issue with the database query.
 */
export const addTask = async (boardID: number, title: string, status: number, columnOrder: number, imageFilename: string | null): Promise<number> => {
    const query = 'INSERT INTO tasks (boardID, title, status, columnOrder, image) VALUES (?, ?, ?, ?, ?)';
    try {
        return await runQuery<number>(query, [boardID, title, status, columnOrder, imageFilename]);
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a task by its ID.
 *
 * @param id - The ID of the task to retrieve.
 * @returns A Promise that resolves to the retrieved task or undefined if not found.
 * @throws Throws an error if there's an issue with the database query.
 */
export const getTaskById = async (id: number): Promise<Task | null> => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    try {
        return await getQuery<Task>(query, [id]);
    } catch (error) {
        throw error;
    }
};

/**
 * Updates a task's title and status by its ID.
 *
 * @param id - The ID of the task to update.
 * @param title - The new title for the task.
 * @param status - The new status code for the task.
 * @returns A Promise that resolves when the task is successfully updated.
 * @throws Throws an error if there's an issue with the database query.
 */
export const updateTask = async (id: number, title: string, status: number): Promise<void> => {
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    try {
        await runQuery<void>(query, [title, status, id]);
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a task by its ID.
 *
 * @param id - The ID of the task to delete.
 * @returns A Promise that resolves when the task is successfully deleted.
 * @throws Throws an error if there's an issue with the database query.
 */
export const deleteTaskById = async (id: number): Promise<void> => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    try {
        await runQuery<void>(query, [id]);
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes tasks based on their status.
 *
 * @param status - The status code of tasks to delete.
 * @returns A Promise that resolves when tasks with the given status are successfully deleted.
 * @throws Throws an error if there's an issue with the database query.
 */
export const deleteTasksByStatus = async (status: number): Promise<void> => {
    const query = 'DELETE FROM tasks WHERE status = ?';
    try {
        await runQuery<void>(query, [status]);
    } catch (error) {
        throw error;
    }
};

/**
 * Inserts multiple tasks into the database.
 *
 * @param tasks - An array of tasks to insert.
 * @returns A Promise that resolves when all tasks are successfully inserted.
 * @throws Throws an error if there's an issue with the database query.
 */
export const insertTasks = async (tasks: any[]): Promise<void> => {
    const query = 'INSERT INTO tasks (boardID, title, status, columnOrder, image) VALUES (?, ?, ?, ?, ?)';
    try {
        await Promise.all(tasks.map(task => runQuery<void>(query, [task.boardID, task.title, task.status, task.columnOrder, task.image])));
    } catch (error) {
        throw error;
    }
};
