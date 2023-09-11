import {getQuery, runQuery} from "./mainDB";
import {UserData} from "../types/customTypes";

/**
 * Adds a new user to the database.
 *
 * @param {string} fullname - The full name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} hashedPassword - The hashed password of the user.
 * @throws {Error} Throws an error if the database operation fails.
 */
export const addUser = async (fullname: string, email: string, hashedPassword: string): Promise<void> => {
    const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    try {
        await runQuery<void>(query, [fullname, email, hashedPassword]);
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a user's data by their email from the database.
 *
 * @param {string} email - The email address of the user.
 * @returns {Promise<UserData | null>} A Promise containing the user's data or null if not found.
 * @throws {Error} Throws an error if the database operation fails.
 */
export const getUserByEmail = async (email: string): Promise<UserData | null> => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const params = [email];
    try {
        return await getQuery<UserData | null>(query, params);
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves the last inserted row ID for a specified table.
 *
 * @param {string} tableName - The name of the table.
 * @returns {Promise<number>} A Promise containing the last inserted row ID.
 * @throws {Error} Throws an error if the database operation fails or if the ID retrieval fails.
 */
export const getLastInsertedRowId = async (tableName: string): Promise<number> => {
    const query = `SELECT last_insert_rowid() as id
                   FROM ${tableName}`;
    try {
        const row = await getQuery<{ id: number }>(query);
        if (row) {
            return row.id;
        } else {
            throw new Error(`Failed to retrieve last inserted row ID for table ${tableName}.`);
        }
    } catch (error) {
        throw error;
    }
};
