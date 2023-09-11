// Import the required modules and functions
import express from 'express';
import {loginUser, registerUser} from '../controllers/authController';

// Create an instance of the 'express' router to handle authentication-related routes.
const authRouter = express.Router();

// When a POST request is made to '/login', the 'loginUser' function from 'authController' will be executed.
authRouter.post('/login', loginUser);
// When a POST request is made to '/register', the 'registerUser' function from 'authController' will be executed.
authRouter.post('/register', registerUser);

// Export the 'authRouter' instance
export default authRouter;
