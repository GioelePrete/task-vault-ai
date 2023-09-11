import {Request, Response} from 'express';
import {addCollaborator, deleteCollaborator, getCollaborators, isUserCollaborator} from '../database/collaboratorDB';
import {getUserByEmail} from '../database/utilsDB';

// Fetch collaborators for a project
export const fetchCollaborators = async (req: Request, res: Response) => {
    const {projectID} = req.query;

    try {
        // Retrieve collaborators from the database for the given projectID
        const collaborators = await getCollaborators(Number(projectID));

        // Return the list of collaborators as a JSON response
        res.json(collaborators);
    } catch (error) {
        console.error('Error fetching collaborators:', error);
        // Send an Internal Server Error response if there's an issue
        res.status(500).send('Internal Server Error');
    }
};

// Invite a collaborator to a project
export const inviteCollaborator = async (req: Request, res: Response) => {
    const {projectID} = req.body;
    const email = Buffer.from(req.body.email, 'base64').toString();
    const role = 'Collaborator'; // Role assigned to the invited user

    try {
        // Check if the user with the provided email exists
        const user = await getUserByEmail(email);

        if (!user) {
            // If the user doesn't exist, inform that they need to register
            return res.send('User not found, this user must register first!');
        }

        // Check if the user is already a collaborator for this project
        const isCollaborator = await isUserCollaborator(projectID, email);

        if (isCollaborator) {
            // If the user is already a collaborator, provide feedback
            return res.send('User is already a collaborator for this project');
        }

        // Add the user as a collaborator for the project in the database
        await addCollaborator(projectID, user.fullname, email, role);

        // Send a success message indicating the addition of the collaborator
        res.send('Collaborator added successfully');
    } catch (error) {
        console.error('Error adding collaborator:', error);
        // Send an Internal Server Error response if there's an issue
        res.status(500).send('Internal Server Error');
    }
};

// Remove a collaborator from a project
export const removeCollaborator = async (req: Request, res: Response) => {
    const {projectID, email} = req.query;
    const decodedEmail = Buffer.from(String(email), 'base64').toString();

    try {
        // Delete the collaborator from the project using projectID and email
        await deleteCollaborator(Number(projectID), decodedEmail);

        // Send a success message indicating the removal of the collaborator
        res.send('Collaborator deleted successfully');
    } catch (error) {
        console.error('Error deleting collaborator:', error);
        // Send an Internal Server Error response if there's an issue
        res.status(500).send('Internal Server Error');
    }
};
