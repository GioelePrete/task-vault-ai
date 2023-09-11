// Import the required modules
import express from 'express';
import {
    createTask,
    editTask,
    getTasks,
    handleCreateTask,
    removeTask,
    updateColumn
} from "../controllers/taskController";

const taskRouter = express.Router();

// Define a route to handle the HTTP GET request for retrieving tasks.
taskRouter.get('/getTasks', getTasks);
// Define a route to handle the HTTP POST request for adding a new task.
// It involves calling the 'createTask' middleware function and then the 'handleCreateTask' function.
taskRouter.post('/addTask', createTask, handleCreateTask);
// Define a route to handle the HTTP PUT request for editing an existing task.
taskRouter.put('/editTask', editTask);
// Define a route to handle the HTTP DELETE request for deleting a task.
taskRouter.delete('/deleteTask', removeTask);
// Define a route to handle the HTTP PUT request for updating the column of a task.
taskRouter.put('/updateColumn', updateColumn);

// Export the 'taskRouter' instance
export default taskRouter;
