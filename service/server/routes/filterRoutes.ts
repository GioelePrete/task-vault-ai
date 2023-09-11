// Import the required modules and functions
import express from 'express';
import {fetchPriority, fetchStatus} from '../controllers/filterController';

// Create a new instance of an Express router.
const filterRouter = express.Router();

// When a request is made to this endpoint, the 'fetchPriority' function from the controller will be executed.
filterRouter.get('/getPriority', fetchPriority);
// When a request is made to this endpoint, the 'fetchStatus' function from the controller will be executed.
filterRouter.get('/getStatus', fetchStatus);

// Export the router
export default filterRouter;
