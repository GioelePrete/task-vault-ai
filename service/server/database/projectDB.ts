import {ProjectData} from "../types/customTypes";
import {getAllQuery, runQuery} from "./mainDB";

/**
 * Retrieves a list of projects based on the provided user, where the user is either the owner or a collaborator.
 * @param user - The user for whom to retrieve projects.
 * @returns A Promise containing an array of ProjectData representing the projects.
 */
export const getProjects = async (user: string): Promise<ProjectData[]> => {
    const query = 'SELECT * FROM projectView WHERE user = ? OR collaboratorsList LIKE ?';
    const params = [user, `%${user}%`];
    try {
        return await getAllQuery<ProjectData[]>(query, params);
    } catch (error) {
        throw error;
    }
};

/**
 * Adds a new project to the database.
 * @param user - The user adding the project.
 * @param owner - The owner of the project.
 * @param name - The name of the project.
 * @param description - The description of the project.
 * @param status - The status of the project.
 * @param progress - The progress of the project.
 * @param priority - The priority of the project.
 */
export const addProject = async (user: string, owner: string, name: string, description: string, status: string, progress: number, priority: string): Promise<void> => {
    const query =
        'INSERT INTO projects (user, owner, name, description, status, progress, priority) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
        await runQuery<void>(query, [user, owner, name, description, status, progress, priority]);
    } catch (error) {
        throw error;
    }
};

/**
 * Edits an existing project in the database based on the provided project ID.
 * @param id - The ID of the project to be edited.
 * @param name - The updated name of the project.
 * @param description - The updated description of the project.
 * @param status - The updated status of the project.
 * @param progress - The updated progress of the project.
 * @param priority - The updated priority of the project.
 */
export const editProject = async (id: number, name: string, description: string, status: string, progress: number, priority: string): Promise<void> => {
    const query =
        'UPDATE projects SET name = ?, description = ?, status = ?, progress = ?, priority = ? WHERE id = ?';
    try {
        await runQuery<void>(query, [name, description, status, progress, priority, id]);
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a project from the database based on the provided project ID.
 * @param id - The ID of the project to be deleted.
 */
export const deleteProject = async (id: number): Promise<void> => {
    const query = 'DELETE FROM projects WHERE id = ?';
    try {
        await runQuery<void>(query, [id]);
    } catch (error) {
        throw error;
    }
};
