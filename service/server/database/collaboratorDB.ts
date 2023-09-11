import {CollaboratorData} from "../types/customTypes";
import {getAllQuery, getQuery, runQuery} from "./mainDB";

/**
 * Retrieves a list of collaborators for a given project.
 * @param projectID - The ID of the project to fetch collaborators for.
 * @returns A Promise containing an array of CollaboratorData.
 * @throws Throws an error if the database query fails.
 */
export const getCollaborators = async (projectID: number): Promise<CollaboratorData[]> => {
    const query = 'SELECT * FROM collaborators WHERE projectID = ? ORDER BY id';
    try {
        return await getAllQuery<CollaboratorData[]>(query, [projectID]);
    } catch (error) {
        throw error;
    }
};

/**
 * Adds a new collaborator to a project.
 * @param projectID - The ID of the project to add the collaborator to.
 * @param user - The username of the collaborator.
 * @param email - The email address of the collaborator.
 * @param role - The role of the collaborator.
 * @returns A Promise indicating successful addition.
 * @throws Throws an error if the database insertion fails.
 */
export const addCollaborator = async (projectID: number, user: string, email: string, role: string): Promise<void> => {
    const query = 'INSERT INTO collaborators (projectID, user, email, role) VALUES (?, ?, ?, ?)';
    try {
        await runQuery<void>(query, [projectID, user, email, role]);
    } catch (error) {
        throw error;
    }
};

/**
 * Checks if a user is a collaborator for a given project.
 * @param projectID - The ID of the project to check.
 * @param email - The email address of the user to check.
 * @returns A Promise containing a boolean indicating whether the user is a collaborator.
 * @throws Throws an error if the database query fails.
 */
export const isUserCollaborator = async (projectID: number, email: string): Promise<boolean> => {
    const query = 'SELECT COUNT(*) AS count FROM collaborators WHERE projectID = ? AND email = ?';
    try {
        const row = await getQuery<{ count: number }>(query, [projectID, email]);
        return row !== null && row.count > 0;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a collaborator from a project.
 * @param projectID - The ID of the project to delete the collaborator from.
 * @param email - The email address of the collaborator to delete.
 * @returns A Promise indicating successful deletion.
 * @throws Throws an error if the database deletion fails.
 */
export const deleteCollaborator = async (projectID: number, email: string): Promise<void> => {
    const query = 'DELETE FROM collaborators WHERE projectID = ? AND email = ?';
    try {
        await runQuery<void>(query, [projectID, email]);
    } catch (error) {
        throw error;
    }
};
