// Import the required modules and functions
import express from 'express';
import {createBoard, fetchBoards, removeBoard, updateBoard} from '../controllers/boardController';

// Create a new router instance using Express.
const boardRouter = express.Router();

// Define routes and associate them with corresponding controller functions

// This route fetches a list of boards.
boardRouter.get('/getBoards', fetchBoards);
// This route adds a new board.
boardRouter.post('/addBoard', createBoard);
// This route updates an existing board.
boardRouter.put('/editBoard', updateBoard);
// This route deletes a board.
boardRouter.delete('/deleteBoard', removeBoard);

// Export the 'boardRouter'
export default boardRouter;