import {Request, Response} from 'express';
import {addProject, deleteProject, editProject, getProjects} from '../database/projectDB';
import {getLastInsertedRowId} from "../database/utilsDB";
import {addCollaborator} from "../database/collaboratorDB";

// Fetch projects for a user
export const fetchProjects = async (req: Request, res: Response) => {
    const user = Buffer.from(String(req.query.user), 'base64').toString();

    try {
        const projects = await getProjects(user);
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new project
export const createProject = async (req: Request, res: Response) => {
    const {user, owner, name, description, status, progress, priority} = req.body;

    try {
        // Add the project to the database
        await addProject(user, owner, name, description, status, progress, priority);

        // Get the ID of the last inserted project
        const id: number = await getLastInsertedRowId("projects");

        // Define the role for the owner
        const role = 'Owner';

        // Add the owner as a collaborator to the project
        await addCollaborator(id, owner, user, role);

        res.status(200).send('Project added successfully');
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update project details
export const updateProject = async (req: Request, res: Response) => {
    const {id, name, description, status, progress, priority} = req.body;

    try {
        // Edit the project details in the database
        await editProject(id, name, description, status, progress, priority);
        res.status(200).send('Project edited successfully');
    } catch (error) {
        console.error('Error editing project:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Remove a project
export const removeProject = async (req: Request, res: Response) => {
    const {id} = req.query;

    try {
        // Delete the project from the database
        await deleteProject(Number(id));
        res.send('Project deleted successfully');
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send('Internal Server Error');
    }
};
