import {BoardData} from "../types/customTypes";
import {getAllQuery, runQuery} from "./mainDB";

/**
 * Retrieve a list of boards for a given project ID.
 * @param projectID The ID of the project for which to retrieve boards.
 * @returns A promise that resolves to an array of BoardData objects.
 */
export const getBoards = async (projectID: number): Promise<BoardData[]> => {
    const query = 'SELECT * FROM boardsView WHERE projectID = ?';
    try {
        return await getAllQuery<BoardData[]>(query, [projectID]);
    } catch (error) {
        throw error;
    }
};

/**
 * Add a new board to a project.
 * @param projectID The ID of the project to which the board will be added.
 * @param name The name of the board.
 * @param description The description of the board.
 * @param status The status of the board.
 * @param progress The progress of the board.
 * @param priority The priority of the board.
 */
export const addBoard = async (projectID: number, name: string, description: string, status: string, progress: number, priority: string
): Promise<void> => {
    const query = 'INSERT INTO boards (projectID, name, description, status, progress, priority) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        await runQuery<void>(query, [projectID, name, description, status, progress, priority]);
    } catch (error) {
        throw error;
    }
};

/**
 * Edit an existing board's details.
 * @param id The ID of the board to be edited.
 * @param name The new name for the board.
 * @param description The new description for the board.
 * @param status The new status for the board.
 * @param progress The new progress for the board.
 * @param priority The new priority for the board.
 */
export const editBoard = async (id: number, name: string, description: string, status: string, progress: number, priority: string
): Promise<void> => {
    const query = 'UPDATE boards SET name = ?, description = ?, status = ?, progress = ?, priority = ? WHERE id = ?';
    try {
        await runQuery<void>(query, [name, description, status, progress, priority, id]);
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a board based on its ID.
 * @param id The ID of the board to be deleted.
 */
export const deleteBoard = async (id: number): Promise<void> => {
    const query = 'DELETE FROM boards WHERE id = ?';
    try {
        await runQuery<void>(query, [id]);
    } catch (error) {
        throw error;
    }
};
