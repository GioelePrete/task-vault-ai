// Import the required modules and functions
import express from 'express';
import {fetchCollaborators, inviteCollaborator, removeCollaborator} from "../controllers/collaboratorController";

// Creating an instance of an Express router
const collaboratorRouter = express.Router();

// Defining routes and associating them with the respective controller functions

// Route for retrieving collaborators using a GET request
collaboratorRouter.get('/getCollaborators', fetchCollaborators);
// Route for inviting a new collaborator using a POST request
collaboratorRouter.post('/addCollaborator', inviteCollaborator);
// Route for removing a collaborator using a DELETE request
collaboratorRouter.delete('/deleteCollaborator', removeCollaborator);

// Exporting the configured router to be used by other parts of the application
export default collaboratorRouter;
