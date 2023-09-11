import {PriorityType, StatusType} from "../types/customTypes";
import {getAllQuery} from "./mainDB";

/**
 * Retrieves the list of priority types from the database.
 *
 * @returns {Promise<PriorityType[]>} A promise that resolves to an array of priority types.
 * @throws Will throw an error if there's an issue with database query or retrieval.
 */
export const getPriority = async (): Promise<PriorityType[]> => {
    const query = 'SELECT * FROM priority';
    try {
        return await getAllQuery<PriorityType[]>(query, []);
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves the list of status types from the database.
 *
 * @returns {Promise<StatusType[]>} A promise that resolves to an array of status types.
 * @throws Will throw an error if there's an issue with database query or retrieval.
 */
export const getStatus = async (): Promise<StatusType[]> => {
    const query = 'SELECT * FROM status';
    try {
        return await getAllQuery<StatusType[]>(query, []);
    } catch (error) {
        throw error;
    }
};
