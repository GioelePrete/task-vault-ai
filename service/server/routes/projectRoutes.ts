// Import the 'express' module for creating the router.
import express from 'express';
import {createProject, fetchProjects, removeProject, updateProject} from "../controllers/projectController";

// Create an instance of the Express router to handle project-related routes.
const projectRouter = express.Router();

// Fetch a list of projects.
projectRouter.get('/getProjects', fetchProjects);
// Create a new project.
projectRouter.post('/addProject', createProject);
// Update an existing project.
projectRouter.put('/editProject', updateProject);
// Purpose: Delete a project.
projectRouter.delete('/deleteProject', removeProject);

// Export the router
export default projectRouter;
